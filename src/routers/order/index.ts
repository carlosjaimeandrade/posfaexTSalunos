import express, { Router } from 'express'
import orderController from '../../controllers/order/orderController'

const orderRouter: Router = express.Router()

orderRouter.post("/order", orderController.create)

export default orderRouter