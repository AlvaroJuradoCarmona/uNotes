import {getConnection} from "../database";

const getSubjects = async (req,res) => {
    try{
        const connection = await getConnection();
        
        const query = await connection.query("SELECT idSubject, name FROM subjects");
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

        const query = await connection.query(`SELECT s.idSubject, s.name, s.course, COUNT(d.idSubject) as documentCount FROM subjects s 
                                                LEFT JOIN documents d ON s.idSubject=d.idSubject 
                                                WHERE s.idFaculty = ? 
                                                GROUP BY s.idSubject, s.name 
                                                ORDER BY s.course, s.name;`, idFaculty);
        
        res.json(query);
    }catch(error){
        res.status(500).json({message: "No se ha podido establecer la conexion con la base de datos"});
    }
}

const getSearchInfo = async (req,res) => {
    try{
        const connection = await getConnection();

        const query = await connection.query(`(SELECT s.idSubject as id, s.name, "Asignatura" as idCategory 
                                                FROM subjects s) UNION 
                                                (SELECT idDocument, title, "Archivo" 
                                                FROM documents) 
                                                ORDER BY name ASC;`);

        res.json(query);
    }catch(error){
        res.status(500).json({message: "No se ha podido establecer la conexion con la base de datos"});
    }
}

export const methods = { 
    getSubjects, 
    getSubjectById,
    getSubjectsByFacultyId,
    getSearchInfo
};