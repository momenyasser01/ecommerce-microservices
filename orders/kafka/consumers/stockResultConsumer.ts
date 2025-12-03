import { makeKafka, createConsumer, getProducer } from '../kafkaClient'
import prisma from '../../prismaClient'
import {
  OrderStockConfirmedEvent,
  OrderStockRejectedEvent,
  OrderCreatedEvent,
  OrderCancelledEvent,
} from '../events'
import { CompressionTypes } from 'kafkajs'

const kafka = makeKafka('orders-service')

export async function runStockResultConsumer() {
  const consumer = createConsumer(kafka, 'orders-service-stock-group')
  await consumer.connect()
  await consumer.subscribe({ topic: 'order.stock-confirmed', fromBeginning: false })
  await consumer.subscribe({ topic: 'order.stock-rejected', fromBeginning: false })

  await consumer.run({
    eachMessage: async ({ topic, message }) => {
      if (!message.value) return
      const payload = JSON.parse(message.value.toString())

      console.log('Received event: ', message.value.toString())

      console.log('[Orders] Received event: ', payload)

      if (topic === 'order.stock-confirmed') {
        const ev = payload as OrderStockConfirmedEvent
        // idempotency: check order status
        const order = await prisma.orders.findUnique({ where: { id: ev.orderId } })
        if (!order) return console.warn('order not found', ev.orderId)
        if (order.status !== 'PENDING') return // already processed

        // update to CREATED
        await prisma.orders.update({
          where: { id: ev.orderId },
          data: { status: 'CREATED' },
        })

        // publish order.created
        const producer = await getProducer(kafka)
        const createdEvent: OrderCreatedEvent = {
          orderId: ev.orderId,
          status: 'CREATED',
          email: order.email || '',
          createdAt: new Date().toISOString(),
        }
        await producer.send({
          topic: 'order.created',
          messages: [{ key: ev.orderId, value: JSON.stringify(createdEvent) }],
          compression: CompressionTypes.GZIP,
        })
      } else if (topic === 'order.stock-rejected') {
        const ev = payload as OrderStockRejectedEvent
        // update to CANCELLED
        const order = await prisma.orders.findUnique({ where: { id: ev.orderId } })
        if (!order) return console.warn('order not found', ev.orderId)
        if (order.status !== 'PENDING') return

        await prisma.orders.update({
          where: { id: ev.orderId },
          data: { status: 'CANCELLED' },
        })

        const producer = await getProducer(kafka)
        const cancelledEvent: OrderCancelledEvent = {
          orderId: ev.orderId,
          status: 'CANCELLED',
          email: order.email || '',
          reason: 'OUT_OF_STOCK',
          cancelledAt: new Date().toISOString(),
        }
        await producer.send({
          topic: 'order.cancelled',
          messages: [{ key: ev.orderId, value: JSON.stringify(cancelledEvent) }],
          compression: CompressionTypes.GZIP,
        })
      }
    },
  })
}
