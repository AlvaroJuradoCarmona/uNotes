import {getConnection} from "../database";

const getLicenses = async (req,res) => {
    try{
        const connection = await getConnection();
        
        const query = await connection.query("SELECT * FROM licenses");
        res.json(query);
    }catch(error){
        res.status(500).json({message: "No se ha podido establecer la conexion con la base de datos"});
    }
}

export const methods = { 
    getLicenses
};