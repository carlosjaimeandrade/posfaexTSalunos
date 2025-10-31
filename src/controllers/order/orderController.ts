import { Request, Response } from 'express'
import orderCreateService from '../../services/order/orderCreateService'

const create = async (req: Request, res: Response): Promise<void> => {
    try {
        const body = req.body

        const validPayload = orderCreateService.validPayload(body)

        if (!validPayload) {
            res.status(200)
            res.json({
                message: "você precisa enviar o id, sku e quantity"
            })
            return
        }

        //checkout PRO
        //vamos criar a integração
        //vai retornar um url de pagamento
        //ter um referencia para buscar a informação do pedido

        const newOrder = {
            productId: 1,
            sku: req.body.sku,
            quantity: req.body.quantity,
            total: 23232,
            reference: "2131313131321",
            price: 23232,
            status: "pendente",
            address: "Rua jose Extrema mg",
        }

        const order = await orderCreateService.create(newOrder)

        if (!order) {
            res.status(500)
            res.json({
                message: "ocorreu um erro tente novamente"
            })
        }

        res.json({
            message: "rota de geração de pedidos",
            order,
            linkCheckout: "url para pagamento"
        })

        return
    } catch (error) {
        console.log(error)
        res.status(500)
        res.json({
            message: "ocorreu um erro interno"
        })
    }    
}

export default {
    create
}