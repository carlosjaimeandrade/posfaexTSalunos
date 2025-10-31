import 'dotenv/config'
import connection from "../config/database";
import User from "./User/User";
import Product from './Product/Product';
import Order from './Order/Order';

User.hasMany(Product, {
    foreignKey: {
        name: "userId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    }
})

Product.hasMany(Order)

connection.sync({
    force: false,
    alter: true
}).then(() => {
    console.log("tabelas sincronizadas")
})

export default {
    User
}