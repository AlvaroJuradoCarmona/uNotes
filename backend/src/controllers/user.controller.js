import {getConnection} from "../database";

const getUsers = async (req,res) => {
    try{
        const connection = await getConnection();
        const query = await connection.execute("SELECT * FROM roles");
        console.log(query);
        res.json(query);
    }catch(error){
        res.status(500).send(error.message);
    }
}

export const methods = {
    getUsers
}