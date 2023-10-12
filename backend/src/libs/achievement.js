import { getConnection } from "../database"

const getAchievement = async (id) => {
    const connection = await getConnection();
    const query = await connection.query("SELECT idAchievement from users_achievements where idUser = ?;", id)
    const parse = JSON.parse(JSON.stringify(query))
    const res = parse.map(e => e.idAchievement)
    return res
}

const insertPoints = async (idUser, additionalPoints) => {
    try{
        const connection = await getConnection();
        const data = {idUser, additionalPoints}

        const currentPointsResult = await connection.query("SELECT points FROM users WHERE idUser = ?;", idUser);
        const currentPoints = currentPointsResult[0][0].points;
        data.points = currentPoints + additionalPoints;
        console.log(data.points)

        await connection.query("UPDATE users SET points = ? WHERE idUser = ?", [data.points, idUser]);
    }catch{
        return false
    }
}

const insertAchievement = async (idAchievement, idUser, additionalPoints) => {
    try{
        const connection = await getConnection();
        const data = {idAchievement, idUser}
        await connection.query("INSERT INTO users_achievements SET ?", data);
        return true;
    }catch{
        return false
    }
}

const lookAchievement = async (idAchievement, idUser) => {
    const res = await getAchievement(idUser)
    return res.includes(idAchievement)
}

const checkAchievement = async (idAchievement, idUser, additionalPoints) => {
    if(!await lookAchievement(idAchievement, idUser)){
        const achievementInserted = await insertAchievement(idAchievement, idUser)
        if (achievementInserted) {
            await insertPoints(idUser, additionalPoints);
            return true;
        }
    } 
    return false
}

const fileCount = async (idUser) => {
    try{
        const connection = await getConnection();
        const res = await connection.query("select count(*) as fileCount from documents where idUser = ?;", idUser)
        const count = res[0][0].fileCount
        return count
    }catch{
        return false
    }
}

const commentCount = async (idUser) => {
    try{
        const connection = await getConnection();
        const res = await connection.query("select count(*) as commentCount from comments where idUser = ?;", idUser)
        const count = res[0][0].commentCount
        return count
    }catch{
        return false
    }
}

const userValidation = async (idUser) => {
    try{
        const connection = await getConnection();
        const query = await connection.query("select isValidated from users where idUser = ?;", idUser)
        const res = query[0][0].isValidated
        return res
    }catch{
        return false
    }
}

export const methods = {
    checkAchievement,
    fileCount,
    commentCount,
    userValidation
}