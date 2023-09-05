import {getConnection} from "../database";

const getUserById = async (req, res) => {
    try {
        const connection = await getConnection()
        const { idUser } = req.params

        const user = await connection.query("SELECT * FROM users WHERE idUser = ? ", idUser)

        res.json(user)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export const methods = {
    getUserById
}