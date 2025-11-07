import userRepository from "../../Model/User/userRepository";
import UserModelInterface from "../../Model/User/Interface/UserModelInterface";

const getUsers = async (): Promise<UserModelInterface[]> => {
    try {
        const users = await userRepository.findAll()

        return users
    } catch (error: any) {
        throw new Error(error)
    }
}

export  default {
    getUsers
}