import express from 'express'

import getProducts from '../controllers/get-products'
import createProduct from '../controllers/create-product'
import getProductById from '../controllers/get-product'
import updateQuantity from '../controllers/update-quantity'
import updateProduct from '../controllers/update-product'
import validateCart from '../controllers/validate-cart'
import validateAndUpdateStock from '../controllers/validate-and-update'

const router = express.Router()

router.get('/', getProducts)
router.get('/:id', getProductById)
router.post('/validate-cart', validateCart)
router.post('/', createProduct)
router.patch('/', updateProduct)
router.patch('/update-quantity', updateQuantity)
router.patch('/validate-and-update', validateAndUpdateStock)

export default router
