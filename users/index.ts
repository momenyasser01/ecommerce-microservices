import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import users from './routes/users'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const port = process.env.PORT || 5001

app.use('/users', users)

app.listen(port, () => {
  console.log(`Users service running on port ${port}`)
})