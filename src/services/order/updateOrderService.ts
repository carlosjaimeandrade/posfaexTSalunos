import orderRepository from "../../Model/Order/orderRepository"
import OrderModelInterface from "../../Model/Order/Interface/OrderModelInterface"

const update = async (order: Partial<OrderModelInterface>, id: number): Promise<boolean> => {
    try {
        const orderUpdate = await orderRepository.update(order, id)

        return orderUpdate
    } catch (error: any) {
        throw new Error(error)
    }
}

export default {
    update
}