import express, { Router } from 'express'
import productController from '../../controllers/product/productController'
import auth from '../../middleware/auth'

const productRouter: Router = express.Router()

productRouter.post("/product", productController.create)

export default productRouter