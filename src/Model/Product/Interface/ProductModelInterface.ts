import { Model } from "@sequelize/core"

interface ProductModelInterface extends Model {
    name: string,
    sku: string,
    quantity: number,
    price: number,
    userId: number
}

export default ProductModelInterface