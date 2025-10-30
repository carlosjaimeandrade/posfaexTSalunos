import express, { Express } from "express"
import userRouter from "./routers/user"
import productRouter from "./routers/product"

const app: Express = express()

app.use(express.json())
app.use(userRouter)
app.use(productRouter)

export default app