import express from 'express'

import createOrder from '../controllers/create-order'
import getOrders from '../controllers/get-orders'
import getOrderById from '../controllers/get-order'
import updateOrder from '../controllers/update-order'
import deleteOrder from '../controllers/delete-order'

const router = express.Router()

router.get('/', getOrders)
router.get('/:id', getOrderById)
router.post('/', createOrder)
router.patch('/', updateOrder)
router.delete('/:id', deleteOrder)

export default router