import {getConnection} from "../database";

const getFaculties = async (req,res) => {
    try{
        const connection = await getConnection();
        const {idUniversity} = req.query;
        let query;
        
        if (idUniversity === undefined)
            query = await connection.query("SELECT * FROM faculties");
        else
            query = await connection.query("SELECT name FROM faculties WHERE idUniversity = ?", idUniversity);
        res.json(query);
    }catch(error){
        res.status(500).json({message: "No se ha podido establecer la conexion con la base de datos"});
    }
}

const getFacultyById = async (req,res) => {
    try{
        const connection = await getConnection();
        const {id} = req.params;
        const query = await connection.query("SELECT * FROM faculties WHERE idFaculty = ?", id);
        res.json(query);
    }catch(error){
        res.status(500).json({message: "No se ha podido establecer la conexion con la base de datos"});
    }
}

export const methods = { 
    getFaculties, 
    getFacultyById
};