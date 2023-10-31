import {getConnection} from "../database";
import * as authlib from "../libs/authlib"
import jwt from 'jsonwebtoken'
import config from "../config";
import { sendEmailToUser } from "../libs/email"
import {methods as achievementsLib} from "../libs/achievement"

export const signUp = async (req, res) => {
    try{
        const connection = await getConnection();

        const {username, email, password, passwordConfirmation, selectedUniversity, selectedFaculty} = req.body
        const validEmail = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+[.][a-zA-Z]+$')

        if(username === '' || email === '' || password === '' || passwordConfirmation === '' || selectedUniversity === '' || selectedUniversity === '')
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
        
        const user = {username, "email": emailLower, "password": passwordEncrypt, idUniversity: selectedUniversity, idFaculty: selectedFaculty}
        await connection.query("INSERT INTO users SET ?", user)

        const [ userInfo ] = await connection.query(`SELECT idUser, isAdmin FROM users WHERE email = ?`, emailLower)
        const token = jwt.sign({idUser: userInfo[0].idUser, isAdmin: userInfo[0].isAdmin}, config.secret, { expiresIn: 86400 })

        const subject = "Bienvenido a uNotes"
        const activationLink = `${config.react_host}confirmAccount/${token}`
        const message = `Ya casi estás!!,\n Pulsa el enlace a continuación para activar tu cuenta:\n${activationLink}\n`  
        sendEmailToUser(email, subject, message, false, res)
        return res.json({token})
    }catch(error){
        res.status(500).json({message: "No se ha podido establecer la conexion con la base de datos - " + error.message});
    }
}

export const confirmAccount = async (req, res) => {
    try {
      const {token} = req.params
      const connection = await getConnection()
      console.log(token)
      if (token === undefined)
        return res.status(400).json({message: "Token no encontrado"})
      
      const {idUser} = jwt.verify(token, config.secret)
      await connection.query("UPDATE users SET isValidated=1 WHERE idUser=?", idUser)

      if (await achievementsLib.userValidation(idUser) == 1)
        await achievementsLib.checkAchievement(5, idUser)

      return res.json({ message: "Cuenta verificada!" })
    } catch (error) {
      return res.status(500).send(error.message)
    }
  }

  export const getAccount = (req, res) => {
    const {token} = req.params

    if (token === undefined)
      return res.status(400).json({"message": "Token no encontrado"})
    const rest = jwt.verify(token, config.secret)

    return res.json({"idUser": rest.idUser, "isAdmin": rest.isAdmin})
  }

  export const signIn = async (req, res) => {
    try {
      const {email, password} = req.body
      const connection = await getConnection()
      
      const [ existEmail ] = await connection.query('SELECT email FROM users WHERE email = ?', email)
      if (existEmail.length === 0)
          return res.status(400).json({ message: "Email not found" })
      console.log(existEmail)
      const [ passwordCheck ] = await connection.query('SELECT password FROM users WHERE email = ?', email)
      console.log(passwordCheck)
      const matchPassword = await authlib.validatePassword(password, passwordCheck[0].password)
      if (!matchPassword)
          return res.status(400).json({ message: "Invalid password" })
      
      const [ userInfo ] = await connection.query(`SELECT idUser, isAdmin FROM users WHERE email = ?`, email)

      const token = jwt.sign({idUser: userInfo[0].idUser, isAdmin: userInfo[0].isAdmin}, config.secret, { expiresIn: 86400 })
      
      return res.json({ token })
    } catch(error) {
      return res.status(500).send(error.message)
    }
  }

  export const recoverPassword = async (req, res) => {
    try {
      const {email} = req.body
      
      const connection = await getConnection()
      
      const existEmail = await connection.query("SELECT email FROM users WHERE email=?", email)
      if (existEmail.length === 0)
          return res.status(500).json({message: "Email not found"})
      
      const autoGeneratedPassword = authlib.generatePassword();
      const password = await authlib.encryptPassword(autoGeneratedPassword)
      await connection.query("UPDATE users SET password=? WHERE email=?", [password, email])
  
      const subject = 'Solicitud de reseteo de contraseña'
      const message = `Para acceder nuevamente a su cuenta, por favor introduzca la siguiente contraseña autogenerada: ${autoGeneratedPassword}\n\nAunque hayas solicitado el cambio de contraseña con anterioridad, la única contraseña válida es el que aparece en este correo.\n\nAtentamente,\nEl equipo de uNotes.`
      return sendEmailToUser(email, subject, message, true, res)
    } catch (error) {
      console.log(error)
      return res.status(500).send(error.message)
    }
  }

  export const updateAvatar = async (req, res) => {
    try {
      const {idUser, avatar_url} = req.body

      if(avatar_url === '')
            return res.status(500).json({message: "Fill all fields"})
      
      const connection = await getConnection()
      
      await connection.query("UPDATE users SET avatar_url=? WHERE idUser=?", [avatar_url, idUser])

    } catch (error) {
      console.log(error)
      return res.status(500).send(error.message)
    }
  }

  export const updateUsername = async (req, res) => {
    try {
      const {idUser, username} = req.body

      if(username === '')
            return res.status(500).json({message: "Fill all fields"})
      
      const connection = await getConnection()
      
      const existUsername = await connection.query("SELECT username FROM users WHERE username=?", username)
      if (existUsername.length === 0)
          return res.status(500).json({message: "Username not found"})
      
      await connection.query("UPDATE users SET username=? WHERE idUser=?", [username, idUser])

    } catch (error) {
      console.log(error)
      return res.status(500).send(error.message)
    }
  }

  export const updateEmail = async (req, res) => {
    try {
      const {idUser, email} = req.body

      if(email === '')
      return res.status(500).json({message: "Fill all fields"})
      
      const connection = await getConnection()
      
      const validEmail = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+[.][a-zA-Z]+$')
      if (!validEmail.test(email))
            return res.status(500).json({message: "Invalid email"})

      const existEmail = await connection.query("SELECT email FROM users WHERE email=?", email)
      if (existEmail.length === 0)
          return res.status(500).json({message: "Email not found"})
      
      await connection.query("UPDATE users SET email=? WHERE idUser=?", [email, idUser])

    } catch (error) {
      console.log(error)
      return res.status(500).send(error.message)
    }
  }

  export const updatePassword = async (req, res) => {
    try {
      const {idUser, password, passwordConfirmation} = req.body

      if(password === '' || passwordConfirmation === '')
      return res.status(500).json({message: "Fill all fields"})
      
      const connection = await getConnection()

      if (password.length < 8 || password.length > 100)
        return res.status(500).json({message: "Invalid password: Password must be between 8 and 100 characters"})
      else if (password !== passwordConfirmation)
        return res.status(500).json({message: "Invalid password: Passwords don't match"})

      const passwordEncrypt = await authlib.encryptPassword(password)
      
      await connection.query("UPDATE users SET password=? WHERE idUser=?", [passwordEncrypt, idUser])

    } catch (error) {
      console.log(error)
      return res.status(500).send(error.message)
    }
  }

  export const updateStudies = async (req, res) => {
    try {
      const {idUser, idUniversity, idFaculty} = req.body

      if(idUniversity === '' || idFaculty === '')
      return res.status(500).json({message: "Fill all fields"})
      
      const connection = await getConnection()
      
      await connection.query("UPDATE users SET idUniversity=?, idFaculty=? WHERE idUser=?", [idUniversity, idFaculty, idUser])

    } catch (error) {
      console.log(error)
      return res.status(500).send(error.message)
    }
  }

export const methods = {
    signUp,
    confirmAccount,
    getAccount,
    signIn,
    recoverPassword,
    updateAvatar,
    updateUsername,
    updateEmail,
    updatePassword,
    updateStudies
}