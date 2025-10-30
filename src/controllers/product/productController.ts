import { Response, Request } from 'express'
import createService from '../../services/product/createService'

const create = async (req: Request, res: Response): Promise<void> => {
    const valid = createService.validPayload(req.body)

    if (!valid) {
        res.status(400)
        res.json({
            message: "você precisa enviar os campos, name, sku, price e quantity"
        })
        return
    }

    res.json({
        message: "chamou a rota de criação"
    })
}

export default {
    create
}