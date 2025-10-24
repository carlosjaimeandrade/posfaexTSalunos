import ValidPayloadAuthInterface from "../../Model/User/Interface/ValidPayloadAuthInterface";
import userRepository from "../../Model/User/userRepository";
import UserModelInterface from "../../Model/User/Interface/UserModelInterface";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const validPayload = (payload: ValidPayloadAuthInterface): boolean  => {
    if (!payload.email || !payload.password) {
        return false
    }

    return true
}

const auth = async (email: string, password: string): Promise<UserModelInterface | null> => {
    const user = await userRepository.findByEmail(email)
    if (!user) {
        return null
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        return null
    }

    return user
}


const createToken = (user: UserModelInterface): boolean | object => {
    const JWT_SECRET: string | undefined = process.env.JWT_SECRET

    if (!JWT_SECRET) {
        return false
    }

    const payload = {
        email: user.email
    }

    const expiresIn = '1h'

    const token = jwt.sign(payload, JWT_SECRET, {expiresIn})

    return {
        token,
        expiresIn
    }
}

export default{
    validPayload,
    auth,
    createToken
}