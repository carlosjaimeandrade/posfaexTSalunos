import express, { Router } from 'express'
import orderController from '../../controllers/order/orderController'
import auth from '../../middleware/auth'
import authAdmin from '../../middleware/authAdmin'

const orderRouter: Router = express.Router()

orderRouter.post("/order", auth,orderController.create)

orderRouter.post("/order/notify", orderController.notify)

//admin
orderRouter.post("/orders", authAdmin, orderController.getAllOrders)
orderRouter.post("/order/:reference", authAdmin, orderController.getOrder)
orderRouter.patch("/order/:id", authAdmin, orderController.updateOrder)
export default orderRouter