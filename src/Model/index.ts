import 'dotenv/config'
import connection from "../config/database";
import User from "./User/User";
import Product from './Product/Product';

User.hasMany(Product, {
    foreignKey: {
        name: "userId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    }
})

connection.sync({
    force: false,
    alter: true
}).then(() => {
    console.log("tabelas sincronizadas")
})

export default {
    User
}