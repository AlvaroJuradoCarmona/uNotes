import {getConnection} from "../database";
import * as authlib from "../libs/authlib"
import jwt from 'jsonwebtoken'
import config from "../config";
import { sendEmailToUser } from "../libs/email"

export const signUp = async (req, res) => {
    try{
        const connection = await getConnection();
        const {username, email, password, passwordConfirmation, idUniversity, idFaculty} = req.body
        const validEmail = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+[.][a-zA-Z]+$')

        if(username === '' || email === '' || password === '' || passwordConfirmation === '' || idUniversity === '' || idFaculty === '')
            return res.status(500).json({message: "Fill all fields"})
        else if (username.length > 20)
            return res.status(500).json({message: "Invalid username: Too long"})
        else if (!validEmail.test(email))
            return res.status(500).json({message: "Invalid email"})
        else if (password.length < 8 || password.length > 100)
            return res.status(500).json({message: "Invalid password: Password must be between 8 and 100 characters"})
        else if (password !== passwordConfirmation)
            return res.status(500).json({message: "Invalid password: Passwords don't match"})

        const [ existUsername ] = await connection.query('SELECT idUser FROM users WHERE username = ?', username)
        if (existUsername.length !== 0)
           return res.status(500).json({message: "Invalid username: User already exist"})

        const [ existEmail ] = await connection.query("SELECT idUser FROM users WHERE email = ?", email)
        if (existEmail.length !== 0)
            return res.status(500).json({message: "Invalid email: Email already exist"})

        const emailLower = email.toLowerCase() 
        const passwordEncrypt = await authlib.encryptPassword(password)
        
        const user = {username, "email": emailLower, "password": passwordEncrypt, idUniversity, idFaculty}
        await connection.query("INSERT INTO users SET ?", user)

        const {idUser} = await connection.query(`SELECT idUser FROM users WHERE email = ?`, emailLower)
        const token = jwt.sign({id: idUser}, config.secret, {
            expiresIn: 86400
        })

        const subject = "Bienvenido a uNotes"
        const activationLink = `${config.react_host}/confirmAccount/${token}`
        const message = `Ya casi estás!!,\n Pulsa el enlace a continuación para activar tu cuenta:\n${activationLink}\n`  
        sendEmailToUser(email, subject, message, false)
        return res.json({token})
    }catch(error){
        res.status(500).json({message: "No se ha podido establecer la conexion con la base de datos - " + error.message});
    }
}

export const confirmAccount = async (req, res) => {
    try {
      const {token} = req.params

      if (token !== undefined)
      {
        const connection = await getConnection()
        const {idUser} = jwt.verify(token, config.secret)
        await connection.query("UPDATE users SET isValidated='1' WHERE idUser=?", idUser)
        return res.json({ message: "Cuenta verificada!" })
      }
      else
        return res.status(400).json({message: "Token no encontrado"})
    } catch (error) {
      return res.status(500).send(error.message)
    }
  }

  export const getAccount = (req, res) => {
    const {token} = req.params

    if (token === undefined)
      return res.status(400).json({"message": "Token no encontrado"})
    const {idUser} = jwt.verify(token, config.secret)
    return res.json({"idUser": idUser})
  }

export const methods = {
    signUp,
    confirmAccount,
    getAccount
}