import { Model } from "@sequelize/core"

interface OrderModelInterface extends Model {
    reference: string,
    quantity: number,
    price: number,
    total: number,
    status: string,
    address: string,
    productId: number,
}

export default OrderModelInterface