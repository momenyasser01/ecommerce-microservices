import { makeKafka, createConsumer, getProducer } from '../kafkaClient'
import prisma from '../../prismaClient'
import {
  OrderStockDeductedEvent,
  OrderStockRejectedEvent,
  OrderCreatedEvent,
  OrderCancelledEvent,
} from '../events'
import { CompressionTypes } from 'kafkajs'

const kafka = makeKafka('orders-service')

export async function runStockResultConsumer() {
  const consumer = createConsumer(kafka, 'orders-service-stock-group')
  await consumer.connect()
  await consumer.subscribe({ topic: 'order.stock-deducted', fromBeginning: false })
  await consumer.subscribe({ topic: 'order.stock-rejected', fromBeginning: false })

  await consumer.run({
    eachMessage: async ({ topic, message }) => {
      if (!message.value) return
      const payload = JSON.parse(message.value.toString())

      console.log('Received event: ', message.value.toString())

      console.log('[Orders] Received event: ', payload)

      if (topic === 'order.stock-deducted') {
        const ev = payload as OrderStockDeductedEvent
        // idempotency: check order status

        const { email } = ev
        // publish order.created
        const producer = await getProducer(kafka)
        const createdEvent: OrderCreatedEvent = {
          orderId: ev.orderId,
          status: 'CREATED',
          email: email || '',
          createdAt: new Date().toISOString(),
        }
        await producer.send({
          topic: 'order.created',
          messages: [{ key: ev.orderId, value: JSON.stringify(createdEvent) }],
          compression: CompressionTypes.GZIP,
        })
      }
    },
  })
}
