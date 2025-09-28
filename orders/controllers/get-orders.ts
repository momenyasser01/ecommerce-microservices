import { Request, Response } from 'express'
import prisma from '../prismaClient'

const getOrders = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, ordering = 'desc' } = req.query

    if (!page || !limit)
      return res.status(400).json({ status: 'Failure', message: 'Missing required fields' })

    if (
      !Number.isInteger(Number(page)) ||
      Number(page) <= 0 ||
      !Number.isInteger(Number(limit)) ||
      Number(limit) <= 0
    )
      return res
        .status(400)
        .json({ status: 'Failure', message: 'Page and limit must be positive integers' })

    const pageNum = Math.max(1, parseInt(page as string, 10))
    const pageSize = Math.max(1, parseInt(limit as string, 10))
    const skip = (pageNum - 1) * pageSize
    const take = pageSize

    const sortOrder = (ordering as string).toLowerCase().startsWith('a') ? 'asc' : 'desc'

    const [orders, total] = await Promise.all([
      prisma.orders.findMany({
        skip,
        take,
        orderBy: { createdAt: sortOrder },
      }),
      prisma.orders.count(),
    ])

    if (!orders || orders.length === 0)
      res.status(404).json({ status: 'Failure', message: 'No orders were found' })

    return res.status(200).json({
      status: 'success',
      page: pageNum,
      limit: pageSize,
      total,
      totalPages: Math.ceil(total / pageSize),
      data: orders,
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ status: 'Failure', message: 'Internal server error' })
  }
}

export default getOrders
