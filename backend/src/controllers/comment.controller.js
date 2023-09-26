import {getConnection} from "../database";
import {methods as achievementsLib} from "../libs/achievement"

const getCommentById = async (req,res) => {
    try{
        const connection = await getConnection();
        const {id} = req.params;
        const query = await connection.query(`SELECT  c.description, DATE_FORMAT(c.created_at, '%d-%m-%Y %H:%i')  AS created_at, u.username, u.avatar_url
                                                FROM comments c LEFT JOIN users u ON c.idUser=u.idUser 
                                                WHERE c.idDocument = ?;`, id);
        res.json(query);
    }catch(error){
        res.status(500).json({message: "No se ha podido establecer la conexion con la base de datos"});
    }
}

const addComment = async (req, res) => {
    try {
        const connection = await getConnection();     
        const {description, id, idUser} = req.body;
        
        const comment = {description, idDocument: id, idUser}
        await connection.query(`INSERT INTO comments SET ?`, comment);
        
        if (await achievementsLib.commentCount(idUser) >= 10)
            await achievementsLib.checkAchievement(4, idUser)
        else
            await achievementsLib.checkAchievement(3, idUser)
        
        res.json("Success!!");
    } catch (error) {
        res.status(500)
        res.send(error.message);
    }
}

export const methods = {
    getCommentById,
    addComment
};