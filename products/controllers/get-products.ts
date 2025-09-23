import { Request, Response } from 'express'
import prisma from '../prismaClient'
import { Category } from '@prisma/client'

const getProducts = async (req: Request, res: Response) => {
  try {
    const { search, category, minPrice, maxPrice } = req.query

    const where: any = {}

    if (search) {
      const s = search.toString().trim()
      where.OR = [
        { name: { contains: s, mode: 'insensitive' } },
        { description: { contains: s, mode: 'insensitive' } },
        { name: { startsWith: s, mode: 'insensitive' } },
        { description: { startsWith: s, mode: 'insensitive' } },
        { name: { endsWith: s, mode: 'insensitive' } },
        { description: { endsWith: s, mode: 'insensitive' } },
      ]
    }

    if (category) {
      const normalized = category.toString().trim().toUpperCase().replace(/ /g, '_')
      where.category = normalized as Category
    }

    if (minPrice || maxPrice) {
      where.price = {}
      if (minPrice && Number(minPrice) >= 0) where.price.gte = Number(minPrice)
      if (maxPrice) where.price.lte = Number(maxPrice)
    }

    const products = await prisma.products.findMany({ where })

    if (!products || products.length === 0)
      return res
        .status(404)
        .json({ status: 'Failure', message: 'No products were found with these filters' })

    return res.json({ status: 'success', length: products.length, data: products })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ status: 'failure', message: 'Internal server error' })
  }
}

export default getProducts
