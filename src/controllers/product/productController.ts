import { Response, Request } from 'express'
import createService from '../../services/product/createService'
import salesProductsService from '../../services/product/salesProductsService'
import productRepository from '../../Model/Product/productRepository'

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

const show = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    if (!id) {
        res.status(400)
        res.json({ message: "O id é obrigatório" })
        return
    }
    const product = await productRepository.findById(id)
    if (!product || product.userId !== req.user.id) {
        res.status(404)
        res.json({ message: "Produto não encontrado" })
        return
    }
    res.json({ product })
}

const destroy = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    if (!id) {
        res.status(400)
        res.json({ message: "O id é obrigatório" })
        return
    }
    const product = await productRepository.findById(id)
    if (!product || product.userId !== req.user.id) {
        res.status(404)
        res.json({ message: "Produto não encontrado" })
        return
    }
    const ok = await productRepository.destroy(id)
    if (!ok) {
        res.status(400)
        res.json({ message: "Não foi possível deletar o produto" })
        return
    }
    res.json({ message: "Produto deletado com sucesso" })
}

const update = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    if (!id) {
        res.status(400)
        res.json({ message: "O id é obrigatório" })
        return
    }
    const product = await productRepository.findById(id)
    if (!product || product.userId !== req.user.id) {
        res.status(404)
        res.json({ message: "Produto não encontrado" })
        return
    }

    const fields: Array<keyof typeof product> = ["name" as any, "sku" as any, "price" as any, "quantity" as any]
    const payload: any = {}
    let hasField = false
    for (const f of fields) {
        if ((req.body as any)[f] !== undefined && (req.body as any)[f] !== "") {
            payload[f] = (req.body as any)[f]
            hasField = true
        }
    }
    if (!hasField) {
        res.status(400)
        res.json({ message: "Envie ao menos um campo para atualizar" })
        return
    }

    if (payload.sku && payload.sku !== product.sku) {
        const exists = await productRepository.findBySku(payload.sku, { userId: req.user.id })
        if (exists && exists.id !== product.id) {
            res.status(400)
            res.json({ message: "Esse sku já existe, escolha outro" })
            return
        }
    }

    const ok = await productRepository.update(payload, id)
    if (!ok) {
        res.status(400)
        res.json({ message: "Não foi possível atualizar o produto" })
        return
    }
    res.json({ message: "Produto atualizado com sucesso" })
}

export default {
    create,
    getSalesProducts,
    destroy,
    update,
    show
}
