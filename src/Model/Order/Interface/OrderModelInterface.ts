import { Model } from "@sequelize/core"

interface OrderModelInterface extends Model {
    id: number
    reference: string,
    quantity: number,
    price: number,
    total: number,
    status: string,
    address: string,
    productId: number,
}

export default OrderModelInterface