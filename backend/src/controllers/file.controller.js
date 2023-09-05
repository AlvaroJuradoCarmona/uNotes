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
        
        let url;
        if (req.files !=  null) {
            await cloudinary.uploader.upload(req.files.file.tempFilePath, async (error, result) => {
                if (error) {
                    res.status(500)
                    res.send(error)
                }
                urlArchivo = result.url;
            })
        }
        
        const {titulo, idUsuario, idAsignatura, nombreArchivo} = req.body;
        
        const fecha = new Date();
        //archivo
        const archivo = {titulo, descripcion, urlArchivo, usuario_idUsuario: idUsuario, Asignatura_idAsignatura: idAsignatura, fecha, nombreArchivo}
        //consulta final
        await connection.query(`INSERT INTO archivo SET ?`, archivo);
        const idArchivoQuery = await connection.query(`SELECT idArchivo from archivo order by idArchivo DESC LIMIT 1`)
        const idArchivo = idArchivoQuery[0].idArchivo
        //idVotacion
        await connection.query("insert into votacion (numeroMeGusta, numeroNoMeGusta, archivo_idArchivo) values (0, 0, ?);", idArchivo)
        //obtener logros usuarios
        console.log("hasta aqui bien?")
        let result = await logrosUtils.logroAportaciones(idUsuario)
        res.json(result);
    } catch (error) {
        res.status(500)
        res.send(error.message);
    }
}



export const methods = { 
    getFiles,
    addFile
};