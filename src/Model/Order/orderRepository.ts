import Order from "./Order"
import OrderModelInterface from "./Interface/OrderModelInterface"

const create = async (order: Partial<OrderModelInterface>): Promise<OrderModelInterface> => {
    try {
        const newOrder = await Order.create(order)
        return newOrder
    } catch (error: any) {
        throw new Error(error);
    }
}

const destroy = async (id: number) => {
    try {
        const order = await Order.destroy({
            where: {
                id
            }
        })

        if (!order) {
            return false
        }

        return true;
    } catch (error: any) {
        throw new Error(error);
    }

}

const update = async (order: Partial<OrderModelInterface>, id: number) => {
    try {
        const updateOrder = await Order.update(order, {
            where: {
                id
            }
        })

        if (updateOrder[0] == 0) {
            return false
        }

        return true;
    } catch (error: any) {
        throw new Error(error);
    }
}

const findAll = async (where: object = {}): Promise<OrderModelInterface[]> => {
    try {
        const orders = await Order.findAll({
            where: {
                ...where
            }
        });
        return orders;
    } catch (error: any) {
        throw new Error(error);
    }
}

export default {
    create,
    destroy,
    update,
    findAll
}