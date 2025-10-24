import express, {Request, Response, NextFunction} from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import userRepository from '../Model/User/userRepository'
import UserModelInterface from '../Model/User/Interface/UserModelInterface'

declare global {
    namespace Express {
        export interface Request {
            user: UserModelInterface
        }
    }
}

interface decodedIterface extends JwtPayload {
    email: string
}

const auth = async (req: any, res:Response , next:NextFunction) => {
    try {
        const authHeader = req.headers.authorization

        if (!authHeader) {
            res.status(401)
            res.json({
                message: "Token é obrigatorio"
            })
            return
        }
        const token = authHeader.split(' ')[1]

        if (!token) {
            res.status(401)
            res.json({
                message: "Token é obrigatorio"
            })
            return
        }

        const JWT_SECRET: string | undefined = process.env.JWT_SECRET

        if (!JWT_SECRET) { 
            res.status(500)
                res.json({
                message: "correu um erro tente novamente mais tarde"
            })
            return
        }

        const decoded = jwt.verify(token, JWT_SECRET) as decodedIterface

        if (!decoded) {
            res.status(401)
            res.json({
                message: "Token inválido"
            })
            return
        }

        const user = await userRepository.findByEmail(decoded.email)
        if (!user) {
            res.status(401)
            res.json({
                message: "Não autorizado"
            })
            return
        }

        if (!user.status) {
            res.status(401)
            res.json({
                message: "Não autorizado"
            })
            return
        }

        req.user = user

    } catch (error) {
        res.status(401)
        res.json({
            message: "Token inválido"
        })
        return
    }

    

    next()
}

export default auth