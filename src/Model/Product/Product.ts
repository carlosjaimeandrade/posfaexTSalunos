import connection from "../../config/database";
import { DataTypes } from "@sequelize/core"
import ProductModelInterface from './Interface/ProductModelInterface'

const Product = connection.define<ProductModelInterface>('product', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    sku: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

export default Product