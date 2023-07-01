import {getConnection} from "../database";
import * as authlib from "../libs/authlib"

export const signUp = async (req, res) => {
    try{
        const connection = await getConnection();
        const {username, email, password, passwordConfirmation} = req.body
        const validEmail = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+[.][a-zA-Z]+$')

        if(username === '' || email === '' || password === '' || passwordConfirmation === '')
            return res.status(500).json({message: "Fill all fields"})
        else if (username.length > 20)
            return res.status(500).json({message: "Invalid username: Too long"})
        else if (!validEmail.test(email))
            return res.status(500).json({message: "Invalid email"})
        else if (password < 8 || password > 100)
            return res.status(500).json({message: "Invalid password: Password must be between 8 and 100 characters"})
        else if (password !== passwordConfirmation)
            return res.status(500).json({message: "Invalid password: Passwords don't match"})

        let existUsername = await connection.query("SELECT idUser FROM users WHERE username = ?", username)
        if (!idUser.isEmpty())
            return res.status(500).json({message: "Invalid username: User already exist"})

        let existEmail = await connection.query("SELECT idUser FROM users WHERE email = ?", email)
        if (!idUser.isEmpty())
            return res.status(500).json({message: "Invalid email: User already exist"})

        const emailLower = email.toLowerCase() 
        const passwordEncrypt = await authlib.encryptPassword(password)
        
        const user = {username, emailLower, passwordEncrypt,}
    }catch{

    }
}