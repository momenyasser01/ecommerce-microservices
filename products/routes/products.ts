import express from 'express'

import getProducts from '../controllers/get-products'
import addProduct from '../controllers/add-product'
import getProductById from '../controllers/get-product'
import updateQuantity from '../controllers/update-quantity'

const router = express.Router()

router.get('/', getProducts)
router.get('/:id', getProductById)
router.post('/', addProduct)
router.patch('/update-quantity', updateQuantity)

export default router
