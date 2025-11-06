import express, { Router } from 'express'
import productController from '../../controllers/product/productController'
import auth from '../../middleware/auth'

const productRouter: Router = express.Router()

productRouter.post("/product", auth, productController.create)

//ela nao tem auth
productRouter.get("/products/sales/:id", productController.getSalesProducts)

// novos endpoints protegidos
productRouter.get("/product/:id", auth, productController.show)
productRouter.patch("/product/:id", auth, productController.update)
productRouter.delete("/product/:id", auth, productController.destroy)

export default productRouter
