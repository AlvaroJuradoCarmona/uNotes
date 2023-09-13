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

export const methods = { 
    getCategories
};