import {getConnection} from "../database";

const getAchievementsByUser = async (req,res) => {
    try{
        const connection = await getConnection();
        const {id} = req.params;

        let query = await connection.query(`SELECT a.idAchievement, a.title, a.description, a.url_img, u.idUser, u.created_at 
                                            FROM users_achievements u LEFT JOIN achievements a ON u.idAchievement = a.idAchievement 
                                            WHERE u.idUser = ? UNION 
                                            SELECT a.idAchievement, a.title, a.description, a.url_img, null as idUser, null as created_at 
                                            FROM achievements a 
                                            WHERE a.idAchievement NOT IN 
                                            (SELECT u.idAchievement 
                                            FROM users_achievements u LEFT JOIN achievements a ON u.idAchievement=a.idAchievement 
                                            WHERE u.idUser=?)
                                            ORDER BY created_at DESC;`, [id, id]);

        res.json(query);
    }catch(error){
        res.status(500).json({message: "No se ha podido establecer la conexion con la base de datos"});
    }
}

const getAchievementsCount = async (req,res) => {
    try{
        const connection = await getConnection();

        let query = await connection.query(`SELECT count(*) as totalCount FROM achievements;`);

        res.json(query);
    }catch(error){
        res.status(500).json({message: "No se ha podido establecer la conexion con la base de datos"});
    }
}

const getAchievementsByUserCount = async (req,res) => {
    try{
        const connection = await getConnection();
        const {id} = req.params;

        let query = await connection.query(`SELECT count(*) as achievementsCount FROM users_achievements WHERE idUser=?;`, id);

        res.json(query);
    }catch(error){
        res.status(500).json({message: "No se ha podido establecer la conexion con la base de datos"});
    }
}

export const methods = { 
    getAchievementsByUser,
    getAchievementsCount,
    getAchievementsByUserCount
};