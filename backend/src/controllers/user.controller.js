import {getConnection} from "../database";

const getUsers = async (req, res) => {
    try {
        const connection = await getConnection()

        const user = await connection.query("SELECT * FROM users ORDER BY username ASC")

        res.json(user)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

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

const deleteUser = async (req, res) => {
    try {
        const {idUser} = req.params
        const connection = await getConnection()
        const query = await connection.query("DELETE FROM users WHERE idUser = ?", idUser)

        res.json(query)
    } catch(error) {
        res.status(500).send(error.message)
    }
}

export const methods = {
    getUsers,
    getUserById,
    deleteUser
}