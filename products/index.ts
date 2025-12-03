import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import products from './routes/products'

import { runOrderPublishedConsumer } from './kafka/consumers/orderPublishedConsumer'
import { makeKafka, getProducer } from './kafka/kafkaClient'

const kafka = makeKafka('products-service')

dotenv.config()

const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/products', products)

const port = process.env.PORT || 5000

async function start() {
  await getProducer(kafka) // warm the producer
  runOrderPublishedConsumer().catch(console.error)
  console.log('Products service started')
  app.listen(port, () => {
    console.log(`Products service running on port ${port}`)
  })
}

start().catch(console.error)
