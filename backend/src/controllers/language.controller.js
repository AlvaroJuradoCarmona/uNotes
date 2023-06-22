import {getConnection} from "../database";

const getLanguages = async (req,res) => {
    try{
        const connection = await getConnection();
        const {year} = req.query;
        let query;
        
        if (year === undefined)
            query = await connection.query("SELECT * FROM languages");
        else
            query = await connection.query("SELECT name, author FROM languages WHERE year = ?", year);
        res.json(query);
    }catch(error){
        res.status(500).json({message: "no se ha hecho la conex"});
    }
}

const getLanguageById = async (req,res) => {
    try{
        const connection = await getConnection();
        const {id} = req.params;
        const query = await connection.query("SELECT * FROM languages WHERE idLanguages = ?", id);
        res.json(query);
    }catch(error){
        res.status(500).json({message: "no se ha hecho la conex"});
    }
}

const addLanguage = async (req,res) => {
    try{
        const connection = await getConnection();
        const {nombre, author, year} = req.body;
        if (nombre === undefined || author === undefined || year === undefined)
            res.status(400).json({message: "Bad request, rellena campos"});
        const language = {"name": nombre, author, year};
        await connection.query("INSERT INTO languages SET ?", language);
        res.json({message: "to de locos"});
    }catch(error){
        res.status(500).json({message: "no se ha hecho la conex"});
    }
}

const updateLanguage = async (req,res) => {
    try{
        const connection = await getConnection();
        const {id} = req.params; //PARAMETRO PASADO EN LA ROUTE
        const {nombre, author, year} = req.body; //LOS ATRIBUTOS 
        if (nombre === undefined || author === undefined || year === undefined)
            res.status(400).json({message: "Bad request, rellena campos"});
        const language = {"name": nombre, author, year};
        await connection.query("UPDATE languages SET ? WHERE idLanguages = ?", [language,id]);
        res.json({message: "to de locos"});
    }catch(error){
        res.status(500).json({message: "no se ha hecho la conex"});
    }
}

const deleteLanguage = async (req,res) => {
    try{
        const connection = await getConnection();
        const {id} = req.params; //PARAMETRO PASADO EN LA ROUTE
        await connection.query("DELETE FROM languages WHERE idLanguages = ?", id);
        res.json({message: "to de locos"});
    }catch(error){
        res.status(500).json({message: "no se ha hecho la conex"});
    }
}

export const methods = { 
    getLanguages, 
    getLanguageById,
    addLanguage,
    updateLanguage,
    deleteLanguage 
};