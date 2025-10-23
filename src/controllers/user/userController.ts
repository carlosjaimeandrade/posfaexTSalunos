import { Request, Response} from 'express'
import createUserService from '../../services/user/createUserService'

const createUser = async (req: Request, res: Response): Promise<void> => {
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

    if (!newUser){
        res.status(500)
        res.json({
            message: "Não foi possivel criar"
        })
        return
    }

    res.json({
        message: "usuário criado com sucesso"
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