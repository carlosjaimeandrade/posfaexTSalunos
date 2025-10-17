import 'dotenv/config'
import connection from "../config/database";
import User from "./User/User";

connection.sync({
    force: false,
    alter: true
}).then(() => {
    console.log("tabelas sincronizadas")
})

export default {
    User
}