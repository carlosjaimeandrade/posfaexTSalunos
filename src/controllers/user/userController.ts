import { Request, Response} from 'express'

const createUser = async (req: Request, res: Response): Promise<void> => {
    res.json({
        message: "rota de criação de usuario"
    })
}

const authUser = async (req: Request, res: Response): Promise<void> => {
    res.json({
        message: "rota de autenticação de usuário"
    })
}

const getUser = async (req: Request, res: Response): Promise<void> => {
    res.json({
        message: "rota de me para devolver as informação baseada no token"
    })
}

const destroyUser = async (req: Request, res: Response): Promise<void> => {
    res.json({
        message: "rota de  deleção"
    })
}

const updateUser = async (req: Request, res: Response): Promise<void> => {
    res.json({
        message: "rota de atualização"
    })
}

export default {
    createUser,
    authUser,
    getUser,
    destroyUser,
    updateUser
}