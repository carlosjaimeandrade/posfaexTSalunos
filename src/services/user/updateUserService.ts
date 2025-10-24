import UserModelInterface from "../../Model/User/Interface/UserModelInterface"
import userRepository from "../../Model/User/userRepository"

const updateUser = async (user: Partial<UserModelInterface>, id: number ) => {
    try {
        return await userRepository.update(user, id)
    } catch (error: any) {
        throw new Error(error);        
    }
}

export default {
    updateUser
}