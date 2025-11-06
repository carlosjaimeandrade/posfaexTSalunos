import orderRepository from "../../Model/Order/orderRepository"

const getOrders = async () => {
    try {
        const orders = await orderRepository.findAll()

        return orders
    } catch (error: any) {
        throw new Error(error)
    }
}

export default {
    getOrders
}