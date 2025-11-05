import { Request, Response } from 'express'
import orderCreateService from '../../services/order/orderCreateService'
import productRepository from '../../Model/Product/productRepository'
import crypto from "crypto"
import { MercadoPagoConfig, Preference } from 'mercadopago';
import orderRepository from '../../Model/Order/orderRepository';

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

        const product = await productRepository.findBySku(req.body.sku, {
            userId: req.body.id
        })

        if (!product) {
            res.status(400)
            res.json({
                message: "houve um erro ao gerar o checkout"
            })
            return
        }

        //checkout PRO
        //vamos criar a integração
        //vai retornar um url de pagamento
        //ter um referencia para buscar a informação do pedido

        const reference = crypto.randomUUID()
        const newOrder = {
            productId: product.id,
            sku: req.body.sku,
            quantity: req.body.quantity,
            total: product.price * req.body.quantity,
            reference: reference,
            price: product.price,
            status: "pendente",
            address: req.body.address,
        }
        const MERCADO_PAGO_TOKEN = process.env.MERCADO_PAGO_TOKEN
        if (!MERCADO_PAGO_TOKEN) {
            res.status(500)
            res.json({
                message: "ocorreu um erro interno"
            })
            return
        }

        const client = new MercadoPagoConfig({ accessToken: MERCADO_PAGO_TOKEN });
        const preference = new Preference(client);
        const result = await preference.create({
            body: {
                items: [
                    {
                        id: reference,
                        title: product.name,
                        quantity: req.body.quantity,
                        unit_price: product.price
                    }
                ],
                external_reference: `F-${reference}`,
                back_urls: {
                    success: 'http://localhost:3000/success',
                    failure: 'http://localhost:3000/failure',
                    pending: 'http://localhost:3000/pending'
                }
            }
        })

        const order = await orderCreateService.create(newOrder)

        if (!order) {
            res.status(500)
            res.json({
                message: "ocorreu um erro tente novamente"
            })
        }

        res.json({
            message: "rota de geração de pedidos",
            linkCheckout: result.init_point
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

const notify = async (req: Request, res: Response): Promise<void> => {
    
    const externalReference = req.body.data.external_reference
    const order = await orderRepository.findByReference(externalReference)
    
    if (!order) {
        res.status(400)
        res.json({
            message: "order não existe"
        })
        return
    }

    const orderUpdate = await orderRepository.update({
        status: req.body.data.status
    }, order.id)

    if (!orderUpdate) {
        res.json({
            message: "não foi possivel atualizar o status"
        })
        return
    }

    res.json({
        messase: order
    })
}

export default {
    create,
    notify
}