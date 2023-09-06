import {getConnection} from "../database";

const getSubjects = async (req,res) => {
    try{
        const connection = await getConnection();
        const {course} = req.query;
        let query;
        
        if (course === undefined)
            query = await connection.query("SELECT * FROM subjects");
        else
            query = await connection.query("SELECT * FROM subjects WHERE course = ?", course);
        res.json(query);
    }catch(error){
        res.status(500).json({message: "No se ha podido establecer la conexion con la base de datos"});
    }
}

const getSubjectById = async (req,res) => {
    try{
        const connection = await getConnection();
        const {id} = req.params;
        const query = await connection.query("SELECT * FROM subjects WHERE idSubject = ?", id);
        res.json(query);
    }catch(error){
        res.status(500).json({message: "No se ha podido establecer la conexion con la base de datos"});
    }
}

const getSubjectsByFacultyId = async (req,res) => {
    try{
        const connection = await getConnection();
        const {idFaculty} = req.params;

        const query = await connection.query("SELECT * FROM subjects WHERE idFaculty = ?", idFaculty);
        
        res.json(query);
    }catch(error){
        res.status(500).json({message: "No se ha podido establecer la conexion con la base de datos"});
    }
}

export const methods = { 
    getSubjects, 
    getSubjectById,
    getSubjectsByFacultyId
};