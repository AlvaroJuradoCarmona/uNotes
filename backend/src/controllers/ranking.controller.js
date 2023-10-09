import {getConnection} from "../database";

const getExperienceRanking = async (req, res) => {
    try {
        const connection = await getConnection()

        const users = await connection.query("SELECT idUser, username, avatar_url, experience FROM users ORDER BY experience DESC")
        const userId = parseInt(req.params.id);
        
        const userPosition = users[0].findIndex(user => user.idUser === userId) + 1;

        res.json({ users, userPosition });
    } catch (error) {
        res.status(500).send(error.message)
    }
}

const getPointsRanking = async (req, res) => {
    try {
        const connection = await getConnection()

        const users = await connection.query("SELECT idUser, username, avatar_url, points FROM users ORDER BY points DESC")
        const userId = parseInt(req.params.id);
        
        const userPosition = users[0].findIndex(user => user.idUser === userId) + 1;

        res.json({ users, userPosition });
    } catch (error) {
        res.status(500).send(error.message)
    }
}

const getExperienceSum = async (req, res) => {
    try {
        const connection = await getConnection()

        const user = await connection.query("SELECT SUM(experience) as totalExperience FROM users;")
        res.json(user)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

const getPointsSum = async (req, res) => {
    try {
        const connection = await getConnection()

        const user = await connection.query("SELECT SUM(points) as totalPoints FROM users;")
        const timeLeft = await connection.query("SELECT DAY(LAST_DAY(NOW())) - DAY(NOW()) AS days_remaining;")

        res.json({ user, timeLeft })
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export const methods = {
    getExperienceRanking,
    getPointsRanking,
    getExperienceSum,
    getPointsSum
}