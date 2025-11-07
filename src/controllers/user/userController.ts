import { Request, Response } from 'express'
import createUserService from '../../services/user/createUserService'
import authUserService from '../../services/user/authUserService'
import destroyUserService from '../../services/user/destroyUserService'
import updateUserService from '../../services/user/updateUserService'
import ADMIN_EMAIL from '../../constants/admin'
import getUsersService from '../../services/user/getUsersService'
import userRepository from '../../Model/User/userRepository'

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

        const tokenPayload = authUserService.createToken(user)

        if (!tokenPayload || typeof tokenPayload === 'boolean') {
            res.status(500)
            res.json({
                message: "Houve um erro ao gerar o token"
            })
            return
        }

        const isAdmin = user.email === ADMIN_EMAIL

        res.json({
            ...tokenPayload,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            },
            isAdmin
        })
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

const getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await getUsersService.getUsers();

        res.json({
            total: users.length,
            users
        })
    } catch (error) {
        res.status(500)
        res.json({
            message: "houve um erro interno"
        })
    }
}

const getUserAdmin = async (req: Request, res: Response): Promise<void> => {
    try {
        const email = req.params.email
        const user = await userRepository.findByEmail(email)

        res.json({
            user
        })
    } catch (error) {
        console.log(error)
        res.status(500)
        res.json({
            message: "houve um erro interno"
        })
    }
}

export default {
    createUser,
    authUser,
    getUser,
    destroyUser,
    updateUser,
    getUsers,
    getUserAdmin
}
