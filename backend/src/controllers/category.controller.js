import {getConnection} from "../database";

const getCategories = async (req,res) => {
    try{
        const connection = await getConnection();
        
        let query = await connection.query("SELECT idCategory, name FROM categories WHERE idCategory < 6");
        
        res.json(query);
    }catch(error){
        res.status(500).json({message: "No se ha podido establecer la conexion con la base de datos"});
    }
}

const getLanguages = async (req,res) => {
    try{
        const connection = await getConnection();
        
        let query = await connection.query(`SELECT c.idCategory, l.name 
                                            FROM categories c LEFT JOIN languages l ON c.idLanguage=l.idLanguage 
                                            WHERE c.name = "Código";`);
        
        res.json(query);
    }catch(error){
        res.status(500).json({message: "No se ha podido establecer la conexion con la base de datos"});
    }
}

const getLanguageByCategoryId = async (req,res) => {
    try{
        const connection = await getConnection();
        const {id} = req.params;
        let query = await connection.query(`SELECT l.name 
                                            FROM categories c LEFT JOIN languages l ON c.idLanguage=l.idLanguage 
                                            WHERE c.idCategory = ?;`, id);
        
        res.json(query);
    }catch(error){
        res.status(500).json({message: "No se ha podido establecer la conexion con la base de datos"});
    }
}

export const methods = { 
    getCategories,
    getLanguages,
    getLanguageByCategoryId
};