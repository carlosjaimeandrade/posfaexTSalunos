import { Response, Request } from 'express'
import createService from '../../services/product/createService'
import salesProductsService from '../../services/product/salesProductsService'

const create = async (req: Request, res: Response): Promise<void> => {
    const userId = req.user.id
    const valid = createService.validPayload(req.body)

    if (!valid) {
        res.status(400)
        res.json({
            message: "você precisa enviar os campos, name, sku, price e quantity"
        })
        return
    }

    const hasSkuRegister = await createService.hasRegister(req.body.sku, userId)

    if (hasSkuRegister) {
        res.status(400)
        res.json({
            message: "Esse sku ja existe escolha outro"
        })
        return
    }

    
    const newProduct = {
        ...req.body,
        userId
    }
    
    const createProduct = await createService.create(newProduct)

    if (!createProduct) {
        res.status(500)
        res.json({
            message: "Não foi possivel criar o seu registro"
        })
        return
    }

    res.status(201)
    res.json({
        message: "Criado com sucesso",
        newProduct: createProduct
    })
}

const getSalesProducts = async (req: Request, res: Response) => {
    if (!req.params.id) {
        res.status(400)
        res.json({
            message: "O id é obrigatorio"
        })
        return
    }
    
    const products = await salesProductsService.getAllById(parseInt(req.params.id))

    if (!products) {
        res.status(404)
        res.json({
            message: "nenhum dado encontrado"
        })
        return
    }

    res.json({
        message: "busca realizada com sucesso",
        products,
    })
}

export default {
    create,
    getSalesProducts
}