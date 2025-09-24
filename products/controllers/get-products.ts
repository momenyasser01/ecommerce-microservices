import { Request, Response } from 'express'
import prisma from '../prismaClient'
import { Category } from '@prisma/client'

const getProducts = async (req: Request, res: Response) => {
  try {
    const { search, category, minPrice, maxPrice, page, limit } = req.query

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

    const pageNum = Math.max(1, parseInt(page as string, 10))
    const pageSize = Math.max(1, parseInt(limit as string, 10))
    const skip = (pageNum - 1) * pageSize
    const take = pageSize

    const [products, total] = await Promise.all([
      prisma.products.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: 'desc' }, // optional, for consistent ordering
      }),
      prisma.products.count({ where }),
    ])

    if (!products || products.length === 0)
      return res
        .status(404)
        .json({ status: 'Failure', message: 'No products were found with these filters' })

    return res.json({
      status: 'success',
      page: pageNum,
      limit: pageSize,
      total,
      totalPages: Math.ceil(total / pageSize),
      data: products,
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ status: 'failure', message: 'Internal server error' })
  }
}

export default getProducts
