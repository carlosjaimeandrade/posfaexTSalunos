import { Model } from "@sequelize/core"

interface UserModelInterface extends Model {
    id: number,
    name: string,
    email: string,
    password: string,
    status: boolean,
    createdAt: string,
    updatedAt: string
}

export default UserModelInterface;