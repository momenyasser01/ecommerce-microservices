import { Request, Response } from 'express'
import { isValidObjectId } from 'mongoose'
import { /*Category, Measurement,*/ Prisma } from '@prisma/client'
import prisma from '../prismaClient'
import { updateProductSchema } from '../schemas/updateProductSchema'

const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.body
    const parsed = updateProductSchema.safeParse(req.body)

    if (!parsed.success) {
      return res.status(400).json({
        status: 'Failure',
        message: 'Validation error',
        errors: parsed.error,
      })
    }

    // const data: any = {}

    // let normalizedMeasurement
    // let normalizedCategory

    if (!id || !isValidObjectId(id))
      return res.status(400).json({ status: 'Failure', message: 'Invalid Id' })

    const product = await prisma.products.findUnique({ where: { id } })

    if (!product)
      return res
        .status(404)
        .json({ status: 'Failure', message: 'No product was found with this id' })

    // if (name && name.length != 0) data.name = name

    // if (description && description.length != 0) data.description = description

    // if (price && Number(price) > 0) data.price = price

    // if (quantity && Number.isInteger(Number(quantity)) && Number(quantity) > 0)
    //   data.quantity = quantity + product.quantity

    // if (weight && Number.isInteger(Number(weight)) && Number(weight) > 0) data.weight = weight

    // if (measurement) {
    //   normalizedMeasurement = measurement.trim().toUpperCase()

    //   if (Object.values(Measurement).includes(normalizedMeasurement as Measurement))
    //     data.measurement = normalizedMeasurement
    // }

    // if (category) {
    //   normalizedCategory = category.trim().toUpperCase()

    //   if (Object.values(Category).includes(normalizedCategory as Category))
    //     data.category = normalizedCategory
    // }

    // if (image && image.length != 0) data.image = image

    if (parsed.data.quantity) {
      let updatedProduct = await prisma.products.update({
        where: { id },
        data: { ...parsed.data, quantity: product.quantity + parsed.data.quantity },
      })

      return res.status(200).json({
        status: 'Success',
        message: 'Product was updated successfully',
        data: updatedProduct,
      })
    }

    const updatedProduct = await prisma.products.update({
      where: { id },
      data: parsed.data,
    })

    return res.status(200).json({
      status: 'Success',
      message: 'Product was updated successfully',
      data: updatedProduct,
    })
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025')
      return res.status(404).json({ status: 'Failure', message: 'Product was not found' })

    console.error(error)
    return res.status(500).json({ status: 'Failure', message: 'Internal server error' })
  }
}

export default updateProduct
