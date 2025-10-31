import productRepository from "../../Model/Product/productRepository"
import ProductModelInterface from "../../Model/Product/Interface/ProductModelInterface"

const getAllById = async (id: number): Promise<ProductModelInterface[] | undefined> => {
    try {
        const products = await productRepository.findAll({
            userId: id
        })

        return products
    } catch (error: any) {
        throw new Error(error)
    }
}

export default {
    getAllById
}