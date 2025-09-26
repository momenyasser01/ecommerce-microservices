import { Request, Response } from 'express'

const signup = (req: Request, res: Response) => {
  try {
    //const { firstName, lastName, email, password } = req.body

    return res.status(200)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ status: 'Failure', message: 'Internal server error' })
  }
}

export default signup
