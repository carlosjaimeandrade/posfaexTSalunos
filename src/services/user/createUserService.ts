import ValidPayloadUserInterface from "../../Model/User/Interface/ValidPayloadUserInterface"
import UserModelInterface from "../../Model/User/Interface/UserModelInterface"
import userRepository from "../../Model/User/userRepository"
import bcrypt from 'bcrypt'

const validPayload = (user: ValidPayloadUserInterface): boolean => {
    if(!user.email || !user.name || !user.password) {
        return false
    }

    return true
}

const create = async (user: Partial<UserModelInterface>): Promise<UserModelInterface | null> => {
    try {
        if (!user.password) {
            return null
        }

        user.password = await bcrypt.hash(user.password, 10)

        const userNew = await userRepository.create(user)

        return userNew
    } catch (error: any) {
        throw new Error(error);
    }
}

const userExist = async (email: string): Promise<boolean> => {
    const user = await userRepository.findByEmail(email) 

    if (user) {
        return true
    }

    return false
}

export default {
    create,
    validPayload,
    userExist
}