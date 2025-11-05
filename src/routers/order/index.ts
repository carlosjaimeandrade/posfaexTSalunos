import express, { Router } from 'express'
import orderController from '../../controllers/order/orderController'

const orderRouter: Router = express.Router()

orderRouter.post("/order", orderController.create)

orderRouter.post("/order/notify", orderController.notify)

export default orderRouter