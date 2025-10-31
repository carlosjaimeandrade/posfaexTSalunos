import OrderValidPayloadInterface from "../../Model/Order/Interface/OrderValidPayloadInterface";
import OrderModelInterface from "../../Model/Order/Interface/OrderModelInterface";
import orderRepository from "../../Model/Order/orderRepository";

const validPayload = (body: OrderValidPayloadInterface): boolean => {
    if (!body.id || !body.sku || !body.quantity) {
        return false
    }

    return true;
}

const create = async (order: Partial<OrderModelInterface>): Promise<OrderModelInterface> => {
    try {
        const newOrder = await orderRepository.create(order)

        return newOrder
    } catch (error: any) {
        throw new Error(error);
    }
}

export default {
    create,
    validPayload
}