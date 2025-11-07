import express, { Router } from 'express'
import userController from '../../controllers/user/userController'
import auth from '../../middleware/auth'
import authAdmin from '../../middleware/authAdmin'

const userRouter: Router = express.Router()

userRouter.post('/user', userController.createUser)

userRouter.post('/auth', userController.authUser)

userRouter.get('/me', auth, userController.getUser)

userRouter.delete('/me',auth, userController.destroyUser)

userRouter.patch('/me',auth, userController.updateUser)

//admin
userRouter.get('/users', authAdmin, userController.getUsers)
userRouter.get('/user/:email', authAdmin, userController.getUserAdmin)


export default userRouter