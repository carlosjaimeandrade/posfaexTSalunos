import Product from "./Product"
import ProductModelInterface from "./Interface/ProductModelInterface"

const create = async (product: Partial<ProductModelInterface>): Promise<ProductModelInterface> => {
    try {
        const newProduct = await Product.create(product)
        return newProduct
    } catch (error: any) {
        throw new Error(error);
    }
}

const findBySku = async (sku: string, where: object = {}): Promise<ProductModelInterface | null> => {
    try {
        const product = await Product.findOne({
            where: {
                sku,
                ...where
            }
        })

        return product
    } catch (error: any) {
        throw new Error(error);
    }
}

const destroy = async (id: number) => {
    try {
        const product = await Product.destroy({
            where: {
                id
            }
        })

        if (!product) {
            return false
        }

        return true;
    } catch (error: any) {
        throw new Error(error);
    }

}

const update = async (user: Partial<ProductModelInterface>, id: number) => {
    try {
        const updateProduct = await Product.update(user, {
            where: {
                id
            }
        })

        if (updateProduct[0] == 0) {
            return false
        }

        return true;
    } catch (error: any) {
        throw new Error(error);
    }
}

const findAll = async (): Promise<ProductModelInterface[]> => {
    try {
        const products = await Product.findAll();
        return products;
    } catch (error: any) {
        throw new Error(error);
    }
}

export default {
    create,
    findBySku,
    destroy,
    update,
    findAll
}