import {getConnection} from "../database";
import {methods as achievementsLib} from "../libs/achievement"

const getFiles = async (req,res) => {
    try{
        const connection = await getConnection();
        
        const query = await connection.query("SELECT * FROM documents");
        res.json(query);
    }catch(error){
        res.status(500).json({message: "No se ha podido establecer la conexion con la base de datos"});
    }
}

const getFileById = async (req,res) => {
    try{
        const connection = await getConnection();
        const {id} = req.params;
        const query = await connection.query("SELECT * FROM documents WHERE idDocument = ?", id);
        res.json(query);
    }catch(error){
        res.status(500).json({message: "No se ha podido establecer la conexion con la base de datos"});
    }
}

const addFile = async (req, res) => {
    try {
        const connection = await getConnection();     
        const {title, url, id, selectedCategory, idUser, selectedLicense} = req.body;
        if(title === '' || url === '')
            return res.status(500).json({message: "Fill all fields"})
        const file = {title, url, idSubject: id, idCategory: selectedCategory, idUser, idLicense: selectedLicense}
        
        await connection.query(`INSERT INTO documents SET ?`, file);        
        if(await achievementsLib.checkAchievement(1, idUser)){
            logroObtenido = true
        }
        res.json("Success!!");
    } catch (error) {
        res.status(500)
        res.send(error.message);
    }
}

const addCode = async (req, res) => {
    try {
        const connection = await getConnection();     
        const {title, description, id, idUser, selectedLanguage, selectedLicense} = req.body;
        
        if(title === '' || description === '')
            return res.status(500).json({message: "Fill all fields"})
        if(title.length < 6)
            return res.status(500).json({message: "Needs to be longer"})

        const file = {title, description, idSubject: id, idCategory: selectedLanguage, idUser, idLicense: selectedLicense}
        
        await connection.query(`INSERT INTO documents SET ?`, file);
        
        res.json("Success!!");
    } catch (error) {
        res.status(500)
        res.send(error.message);
    }
}

const getFilesBySubjectId = async (req,res) => {
    try{
        const connection = await getConnection();
        const {idSubject} = req.params;

        const query = await connection.query(`SELECT d.idDocument, d.title, d.created_at, d.idCategory, u.username, u.avatar_url 
                                                FROM documents d LEFT JOIN users u ON d.idUser=u.idUser 
                                                WHERE d.idSubject = ?;`, idSubject);
        
        res.json(query);
    }catch(error){
        res.status(500).json({message: "No se ha podido establecer la conexion con la base de datos"});
    }
}

export const methods = { 
    getFiles,
    getFileById,
    addFile,
    addCode,
    getFilesBySubjectId
};