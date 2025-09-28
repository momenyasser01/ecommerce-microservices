import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import orders from './routes/orders'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const port = process.env.PORT || 5002

app.use('/orders', orders)

app.listen(port, () => {
  console.log(`Orders service running on port ${port}`)
})
