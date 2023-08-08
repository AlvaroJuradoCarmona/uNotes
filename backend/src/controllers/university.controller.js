import {getConnection} from "../database";

const getUniversities = async (req,res) => {
    try{
        const connection = await getConnection();
        let query;
        
        query = await connection.query("SELECT * FROM universities ORDER BY name ASC");
        res.json(query);
    }catch(error){
        res.status(500).json({message: "No se ha podido establecer la conexion con la base de datos"});
    }
}

const getUniversityById = async (req,res) => {
    try{
        const connection = await getConnection();
        const {id} = req.params;
        const query = await connection.query("SELECT * FROM universities WHERE idUniversity = ?", id);
        res.json(query);
    }catch(error){
        res.status(500).json({message: "No se ha podido establecer la conexion con la base de datos"});
    }
}

export const methods = { 
    getUniversities, 
    getUniversityById
};