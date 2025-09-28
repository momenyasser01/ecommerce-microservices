import express from 'express'

import getProducts from '../controllers/get-products'
import createProduct from '../controllers/create-product'
import getProductById from '../controllers/get-product'
import updateProduct from '../controllers/update-product'

const router = express.Router()

router.get('/', getProducts)
router.get('/:id', getProductById)
router.post('/', createProduct)
router.patch('/update-product', updateProduct)

export default router
