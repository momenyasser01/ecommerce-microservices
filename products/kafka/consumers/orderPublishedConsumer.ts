import { makeKafka, createConsumer, getProducer } from '../kafkaClient'
import axios from 'axios'
import { OrderPublishedEvent, OrderStockDeductedEvent, OrderStockRejectedEvent } from '../events'
import { CompressionTypes } from 'kafkajs'

const kafka = makeKafka('products-service')

export async function runOrderPublishedConsumer() {
  const consumer = createConsumer(kafka, 'products-service-order-group')
  await consumer.connect()
  await consumer.subscribe({ topic: 'order.published', fromBeginning: false })

  await consumer.run({
    eachMessage: async ({ message }) => {
      if (!message.value) return
      const payload = JSON.parse(message.value.toString()) as OrderPublishedEvent

      console.log('[Products] Received event: ', payload)

      const { orderId, items, email, reservationIDs } = payload

      const producer = await getProducer(kafka)

      try {
        // Call the new merged API endpoint
        const response = await axios.patch('http://localhost:5000/products/validate-and-update', {
          cart: items.map((item) => ({ id: item.id, quantity: item.quantity, price: item.price })),
          reservationIDs,
        })

        if (response.data.status === 'Success') {
          // Stock valid → publish confirmed event
          const okEvent: OrderStockDeductedEvent = {
            orderId,
            email,
            valid: true,
            checkedAt: new Date().toISOString(),
          }
          await producer.send({
            topic: 'order.stock-deducted',
            messages: [{ key: orderId, value: JSON.stringify(okEvent) }],
            compression: CompressionTypes.GZIP,
          })
          console.log(`[Products] Stock confirmed for order ${orderId}`)
        } else {
          // If endpoint somehow returns failure without missing (edge case)
          const rejEvent: OrderStockRejectedEvent = {
            orderId,
            valid: false,
            missing: [],
            checkedAt: new Date().toISOString(),
          }
          await producer.send({
            topic: 'order.stock-rejected',
            messages: [{ key: orderId, value: JSON.stringify(rejEvent) }],
            compression: CompressionTypes.GZIP,
          })
          console.log(`[Products] Stock rejected (unknown reason) for order ${orderId}`)
        }
      } catch (err: any) {
        // If API returns 409 → missing items
        if (err.response && err.response.status === 409) {
          const rejEvent: OrderStockRejectedEvent = {
            orderId,
            valid: false,
            missing: err.response.data.missing,
            checkedAt: new Date().toISOString(),
          }
          await producer.send({
            topic: 'order.stock-rejected',
            messages: [{ key: orderId, value: JSON.stringify(rejEvent) }],
            compression: CompressionTypes.GZIP,
          })
          console.log(`[Products] Stock rejected for order ${orderId}`, rejEvent.missing)
        } else {
          // Unexpected error
          console.error('[Products] Error calling validate-and-update endpoint:', err.message)
        }
      }
    },
  })
}
