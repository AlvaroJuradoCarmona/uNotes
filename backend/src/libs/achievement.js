import { getConnection } from "../database"

const getAchievement = async (id) => {
    const connection = await getConnection();
    const query = await connection.query("SELECT idAchievement from users_achievements where idUser = ?;", id)
    const parse = JSON.parse(JSON.stringify(query))
    const res = parse.map(e => e.idAchievement)
    return res
}

const insertAchievement = async (idAchievement, idUser) => {
    try{
        const connection = await getConnection();
        const data = {idAchievement, idUser}
        await connection.query("INSERT INTO users_achievements SET ?", data)
    }catch{
        return false
    }
}

const lookAchievement = async (idAchievement, idUser) => {
    const res = await getAchievement(idUser)
    return res.includes(idAchievement)
}

const checkAchievement = async (idAchievement, idUser) => {
    if(!await lookAchievement(idAchievement, idUser)){
        await insertAchievement(idAchievement, idUser)
        return true
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