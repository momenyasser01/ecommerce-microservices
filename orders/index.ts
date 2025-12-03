import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import { runStockResultConsumer } from "./kafka/consumers/stockResultConsumer";
import { makeKafka, getProducer } from "./kafka/kafkaClient";

import orders from './routes/orders'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/orders', orders)

const port = process.env.PORT || 5002

async function start() {
  // connect producer (so publish used elsewhere won't reconnect repeatedly)
  const kafka = makeKafka("orders-service");
  await getProducer(kafka);
  // start consumers
  runStockResultConsumer().catch(console.error);

  app.listen(port, () => console.log(`Orders service running on ${port}`));
}

start().catch(console.error);