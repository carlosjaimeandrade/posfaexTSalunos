import express, { Router } from 'express'
import productController from '../../controllers/product/productController'
import auth from '../../middleware/auth'

const productRouter: Router = express.Router()

productRouter.post("/product", auth, productController.create)

//ela nao tem auth
productRouter.get("/products/sales/:id", productController.getSalesProducts)

export default productRouter