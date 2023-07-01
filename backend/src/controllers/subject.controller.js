import {getConnection} from "../database";

const getSubjects = async (req,res) => {
    try{
        const connection = await getConnection();
        const {course} = req.query;
        let query;
        
        if (course === undefined)
            query = await connection.query("SELECT * FROM subjects");
        else
            query = await connection.query("SELECT name, author FROM languages WHERE course = ?", course);
        res.json(query);
    }catch(error){
        res.status(500).json({message: "No se ha podido establecer la conexion con la base de datos"});
    }
}

const getSubjectById = async (req,res) => {
    try{
        const connection = await getConnection();
        const {id} = req.params;
        const query = await connection.query("SELECT * FROM languages WHERE idSubject = ?", id);
        res.json(query);
    }catch(error){
        res.status(500).json({message: "No se ha podido establecer la conexion con la base de datos"});
    }
}

export const methods = { 
    getSubjects, 
    getSubjectById
};