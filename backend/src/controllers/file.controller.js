import {getConnection} from "../database";

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
        console.log(hola)
        const file = {title, url, idSubject: id, idCategory: selectedCategory, idUser, idLicense: selectedLicense}
        
        await connection.query(`INSERT INTO documents SET ?`, file);        
        
        res.json("Success!!");
    } catch (error) {
        res.status(500)
        res.send(error.message);
    }
}

const addCode = async (req, res) => {
    try {
        const connection = await getConnection();     
        const {title, description, id, idUser, selectedLicense} = req.body;
        const idCategory = 6
        console.log(idCategory)
        
        const file = {title, description, idSubject: id, idCategory, idUser, idLicense: selectedLicense}
        
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