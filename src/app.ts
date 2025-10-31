import express, { Express } from "express"
import userRouter from "./routers/user"
import productRouter from "./routers/product"
import orderRouter from "./routers/order"

const app: Express = express()

app.use(express.json())
app.use(userRouter)
app.use(productRouter)
app.use(orderRouter)

export default app