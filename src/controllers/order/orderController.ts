import { Request, Response } from 'express'
import orderCreateService from '../../services/order/orderCreateService'
import productRepository from '../../Model/Product/productRepository'
import crypto from "crypto"
import { MercadoPagoConfig, Preference, Payment } from 'mercadopago';
import mercadoPagoConfig from '../../config/mercadoPagoConfig';
import orderRepository from '../../Model/Order/orderRepository';
import getAllOrdersService from '../../services/order/getAllOrdersService';
import updateOrderService from '../../services/order/updateOrderService';

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

        const client = mercadoPagoConfig()

        if (!client) {
            res.status(500)
            res.json({
                message: "Ocorreu um erro interno"
            })
            return
        }

        const preference = new Preference(client as MercadoPagoConfig);
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

const getAllOrders = async (req: Request, res: Response): Promise<void> => {
    try {
        const orders = await getAllOrdersService.getOrders()

        res.json({
            total: orders.length,
            orders
        })
    } catch (error) {
        res.status(500)
        res.json({
            message: "ocorreu um erro interno"
        })
    }
}

const getOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        const reference = req.params.reference

        const client = mercadoPagoConfig()

        if (!client) {
            res.json({
                message: "ocorreu um erro interno"
            })
            return
        }

        const payment = new Payment(client as MercadoPagoConfig)

        const orderMercadoPago = await payment.search({
            options: {
                external_reference: reference
            }
        })

        const order = await orderRepository.findByReference(reference)

        res.json({
            order,
            orderMercadoPago
        })
    } catch (error) {
        res.status(500)
        res.json({
            message: "ocorreu um erro interno"
        })
    }
}

const updateOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id
        const status = req.body.status

        if (!id || !status) {
            res.status(400)
            res.json({
                message: "O parametro id e status obrigatorios"
            })
            return
        }

        const updateOrder = await updateOrderService.update(req.body, parseInt(id))

        if (!updateOrder){
            res.status(500)
            res.json({
                message: "não foi possivel atualizar"
            })
            return
        }

        res.json({
            message: "atualizado com sucesso"
        })
    } catch (error) {
        res.status(500)
        res.json({
            message: "ocorreu um erro interno"
        })
    }
}

export default {
    create,
    notify,
    getAllOrders,
    getOrder,
    updateOrder
}