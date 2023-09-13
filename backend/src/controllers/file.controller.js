import {getConnection} from "../database";

const getFiles = async (req,res) => {
    try{
        const connection = await getConnection();
        const {subject} = req.query;
        let query;
        
        if (subject === undefined)
            query = await connection.query("SELECT * FROM documents");
        else
            query = await connection.query("SELECT * FROM documents WHERE idSubject = ? ORDER BY created_at DESC", subject);
        res.json(query);
    }catch(error){
        res.status(500).json({message: "No se ha podido establecer la conexion con la base de datos"});
    }
}

const addFile = async (req, res) => {
    try {
        const connection = await getConnection();     
        const {title, url, id, selectedCategory, idUser} = req.body;
        console.log(req.body)
        
        const file = {title, url, idSubject: id, idCategory: selectedCategory, idUser}
        
        await connection.query(`INSERT INTO documents SET ?`, file);        
        
        res.json("Success!!");
    } catch (error) {
        res.status(500)
        res.send(error.message);
    }
}



export const methods = { 
    getFiles,
    addFile
};