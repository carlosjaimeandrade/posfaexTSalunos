import User from "./User"
import UserModelInterface from "./Interface/UserModelInterface"

const create = async (user: Partial<UserModelInterface>): Promise<UserModelInterface> => {
    try {
        const newUser = await User.create(user)
        return newUser
    } catch (error: any) {
        throw new Error(error); 
    }
}


const findByEmail = async (email: string): Promise<UserModelInterface | null> => {
    try {
        const user = await User.findOne({
            where: {
                email
            }
        })

        return user
    } catch (error: any) {
        throw new Error(error); 
    }
}


export default {
    create,
    findByEmail
}