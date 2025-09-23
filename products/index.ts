import express from 'express'
import dotenv from 'dotenv'

import products from './routes/products'

dotenv.config()

const app = express()
app.use(express.json())

const port = process.env.PORT || 5000

app.use('/products', products)

app.listen(port, () => {
  console.log(`Product service running on port ${port}`)
})
