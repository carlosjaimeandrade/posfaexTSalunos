import ProductModelInterface from "../../Model/Product/Interface/ProductModelInterface"
import productRepository from "../../Model/Product/productRepository"
import ProductCreateInterface from "../../Model/Product/Interface/ProductCreateInterface"

const validPayload = (body: Partial<ProductModelInterface>): boolean => {
    const fields: (keyof ProductModelInterface)[] = ['name', 'sku', 'price', 'quantity']

    for (const field of fields) {
        if(body[field] == undefined || body[field] == '') {
            return false
        }
    }

    return true
}

const hasRegister = async (sku: string, userId: number): Promise<boolean> => {
    const where = {
        userId
    }
    const product = await productRepository.findBySku(sku, where)

    if (product) {
        return true
    }

    return false
}

const create = async (product: ProductCreateInterface) => {
    try {
        const createProduct = await productRepository.create(product)

        return createProduct
    } catch (error: any) {
        throw new Error(error)
    }
}

export default {
    validPayload,
    hasRegister,
    create
}