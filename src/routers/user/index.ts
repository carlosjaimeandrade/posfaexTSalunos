import express, { Router } from 'express'
import userController from '../../controllers/user/userController'

const userRouter: Router = express.Router()

userRouter.post('/user', userController.createUser)

userRouter.post('/auth', userController.authUser)

userRouter.get('/me', userController.getUser)

userRouter.delete('/me', userController.destroyUser)

userRouter.patch('/me', userController.updateUser)

export default userRouter