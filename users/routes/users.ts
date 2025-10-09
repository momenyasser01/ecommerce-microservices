import express from 'express'
import getUsers from '../controllers/get-users'
import getUserById from '../controllers/get-user'
import signup from '../controllers/signup'
import login from '../controllers/login'
import changePassword from '../controllers/change-password'
import forgotPassword from '../controllers/forgot-password'
import resetPassword from '../controllers/reset-password'
import updateUser from '../controllers/update-user'
import deleteUser from '../controllers/delete-user'

const router = express.Router()

router.get('/', getUsers)
router.get('/:id', getUserById)
router.post('/signup', signup)
router.post('/login', login)
router.post('/forgot-password', forgotPassword)
router.patch('/reset-password/:resetToken', resetPassword)
router.patch('/change-password', changePassword)
router.patch('/', updateUser)
router.delete('/delete-user/:id', deleteUser)

export default router
