import ProductModelInterface from "../../Model/Product/Interface/ProductModelInterface"

const body = {
    name: "carlos",
}
const validPayload = (body: Partial<ProductModelInterface>): boolean => {
    const fields: (keyof ProductModelInterface)[] = ['name', 'sku', 'price', 'quantity']

    for (const field of fields) {
        if(body[field] == undefined || body[field] == '') {
            return false
        }
    }

    return true
}

export default {
    validPayload
}