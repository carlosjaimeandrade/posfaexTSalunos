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

const destroy = async (id: number) => {
    try {
        const user = await User.destroy({
            where: {
                id
            }
        })

        if (!user) {
            return false
        }

        return true;
    } catch (error: any) {
        throw new Error(error);
    }

}

const update = async (user: Partial<UserModelInterface>, id: number) => {
    try {
        const updatedUser = await User.update(user, {
            where: {
                id
            }
        })

        if (updatedUser[0] == 0) {
            return false
        }

        return true;
    } catch (error: any) {
        throw new Error(error);
    }
}

const findAll = async (): Promise<UserModelInterface[]> => {
    try {
        const users = await User.findAll();
        return users;
    } catch (error: any) {
        throw new Error(error);
    }
}

export default {
    create,
    findByEmail,
    destroy,
    update,
    findAll
}