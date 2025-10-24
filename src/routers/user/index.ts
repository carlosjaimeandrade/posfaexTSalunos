import express, { Router } from 'express'
import userController from '../../controllers/user/userController'
import auth from '../../middleware/auth'

const userRouter: Router = express.Router()

userRouter.post('/user', userController.createUser)

userRouter.post('/auth', userController.authUser)

userRouter.get('/me', auth, userController.getUser)

userRouter.delete('/me',auth, userController.destroyUser)

userRouter.patch('/me',auth, userController.updateUser)

export default userRouter