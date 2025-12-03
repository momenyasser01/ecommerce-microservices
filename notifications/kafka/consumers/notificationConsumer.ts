// src/kafka/consumers/notificationConsumer.ts

import { Kafka } from 'kafkajs'

export async function runNotificationConsumer() {
  const kafka = new Kafka({
    clientId: 'notifications-service',
    brokers: [process.env.KAFKA_BROKER || 'localhost:29092'],
  })

  const consumer = kafka.consumer({ groupId: 'notifications-group' })

  await consumer.connect()
  await consumer.subscribe({ topic: 'order.created', fromBeginning: false })
  await consumer.subscribe({ topic: 'order.cancelled', fromBeginning: false })
  await consumer.subscribe({ topic: 'order.delivered', fromBeginning: false })

  console.log('[notifications] Listening for order events...')

  await consumer.run({
    eachMessage: async ({ topic, message }) => {
      try {
        const raw = message.value?.toString()

        console.log('Received order event:', raw)

        if (!raw) return console.log('Empty message received')

        const event = JSON.parse(raw)

        console.log('[notifications] Received event:', event)

        const { type, email, orderId } = event

        switch (topic) {
          case 'order.created':
            await handleOrderCreated({ email, orderId })
            break

          case 'order.cancelled':
            await handleOrderCancelled({ email, orderId })
            break

          case 'order.delivered':
            await handleOrderDelivered({ email, orderId })
            break

          default:
            console.log('[notifications] Unhandled event type:', type)
        }
      } catch (err: any) {
        console.error('[notifications] Error handling message:', err.message)
      }
    },
  })
}

async function sendEmailViaEndpoint({
  to,
  subject,
  html,
  text,
}: {
  to: string
  subject: string
  html?: string
  text?: string
}) {
  const res = await fetch(
    `${process.env.EMAIL_SERVICE_URL || 'http://localhost:5003'}/send-email`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ to, subject, html, text }),
    },
  )

  console.log(res)

  if (!res.ok) {
    const body = await res.text()
    throw new Error(`Failed to send email: ${res.status} ${body}`)
  }

  return res.json()
}

async function handleOrderCreated(data: any) {
  const { email, orderId } = data
  if (!email) return console.error('Missing email for order_created')

  await sendEmailViaEndpoint({
    to: email,
    subject: 'Your order has been created!',
    html: `<h2>Order Created Successfully 🎉</h2><p>Your order <strong>${orderId}</strong> is now created.</p>`,
  })

  console.log('[notifications] Sent order_created email')
}

async function handleOrderCancelled(data: any) {
  const { email, orderId, reason } = data

  await sendEmailViaEndpoint({
    to: email,
    subject: 'Your order was cancelled',
    html: `<h2>Order Cancelled ❌</h2>
      <p>Your order <strong>${orderId}</strong> was cancelled.</p>
      <p>Reason: ${reason || 'Out of stock'}</p>`,
  })

  console.log('[notifications] Sent order_cancelled email')
}

async function handleOrderDelivered(data: any) {
  const { email, orderId } = data

  await sendEmailViaEndpoint({
    to: email,
    subject: 'Your order has been delivered!',
    html: `
      <h2>Delivered 🚚</h2>
      <p>Your order <strong>${orderId}</strong> has been delivered successfully.</p>
    `,
  })

  console.log('[notifications] Sent order_delivered email')
}
