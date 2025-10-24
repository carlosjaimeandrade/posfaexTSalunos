import { Request, Response } from 'express'
import createUserService from '../../services/user/createUserService'
import authUserService from '../../services/user/authUserService'
import destroyUserService from '../../services/user/destroyUserService'
import updateUserService from '../../services/user/updateUserService'

const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const validPayload = createUserService.validPayload(req.body)

        if (!validPayload) {
            res.status(400)
            res.json({
                message: "Email, password and name is required"
            })
            return
        }

        const userExist = await createUserService.userExist(req.body.email)

        if (userExist) {
            res.status(400)
            res.json({
                message: "Email já existe"
            })
            return
        }

        const newUser = await createUserService.create(req.body)

        if (!newUser) {
            res.status(500)
            res.json({
                message: "Não foi possivel criar"
            })
            return
        }

        res.json({
            message: "usuário criado com sucesso"
        })
    } catch (error) {
        res.status(500)
        res.json({
            message: "Ocorreu um erro tente novamente mais tarde"
        })
    }
}

const authUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const validPayload = authUserService.validPayload(req.body)

        if (!validPayload) {
            res.status(400)
            res.json({
                message: "Email and password is required"
            })
            return
        }
        const user = await authUserService.auth(req.body.email, req.body.password)

        if (!user) {
            res.status(400)
            res.json({
                message: "Email ou senha inválidos"
            })
            return
        }

        const token = authUserService.createToken(user)

        if (!token) {
            res.status(500)
            res.json({
                message: "Houve um erro ao gerar o token"
            })
            return
        }

        res.json(token)
    } catch (error) {
        res.status(500)
        res.json({
            message: "Ocorreu um erro tente novamente mais tarde"
        })
    }
}

const getUser = async (req: Request, res: Response): Promise<void> => {
    res.json({
        user: {
            name: req.user.name,
            email: req.user.email,
            id: req.user.id
        }
    })
}

const destroyUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const destroyed = await destroyUserService.destroy(req.user.id)
        if (!destroyed) {
            res.status(400)
            res.json({
                message: "Não foi possivel deletar o usuário"
            })
            return
        }

        res.status(200)
        res.json({
            message: "Usuário deletado com sucesso"
        })
    } catch (error: any) {
        res.status(500)
        res.json({
            message: "Ocorreu um erro tente novamente mais tarde"
        })
    }
}

const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const updated = await updateUserService.updateUser(req.body, req.user.id)

        if (!updated) {
            res.status(400)
            res.json({
                message: "Não foi possivel atualizar o usuário"
            })
            return
        }

        res.status(200)
        res.json({
            message: "Usuário atualizado com sucesso"
        })

    } catch (error) {
        res.status(500)
        res.json({
            message: "Ocorreu um erro tente novamente mais tarde"
        })
    }
}

export default {
    createUser,
    authUser,
    getUser,
    destroyUser,
    updateUser
}