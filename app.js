import express from "express"
import dotenv from 'dotenv';
import mongoose from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "./models/User.js"

dotenv.config();

const app = express()

// Config JSON response
app.use(express.json())

const checkToken = (req, res, next) => {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]

    if(!token) {
        return res.status(401).json({message: "Acesso negado!"})
    }

    try{

        const secret = process.env.SECRET
        jwt.verify(token, secret)

        next()
    } catch(error) {
        res.status(400).json({message: "Token inválido"})
    }
}


// Open Route - Public Route
app.get("/", (req, res) => {
    res.status(200).json({mensage: "Bem vindo a nossa API !"})
})

// Private Route
app.get("/user/:id", checkToken, async(req, res) => {

    const id = req.params.id

    // check if user exists
    const user = await User.findById(id, "-password")

    if(!user) {
        return res.status(404).json({message: "Usuario nao encontrado"})
    }

    res.status(200).json({ user })

})



// Register User 
app.post("/auth/register", async(req, res) => {

    const { name, email, password, confirmPassword } = req.body

    // Validations
    if(!name) {
        return res.status(422).json({message: "O nome é obrigatorio"})
    }

    if(!email) {
        return res.status(422).json({message: "O email é obrigatorio"})
    }
   
    if(!password) {
        return res.status(422).json({message: "A senha é obrigatoria"})
    }

    if(password !== confirmPassword){
        return res.status(422).json({message: "As senhas não conferem"})
    }

    // check if use exists
    const userExists = await User.findOne({email: email})

    if(userExists) {    
        return res.status(422).json({message: "Por favor utilize outro email!"})
    }

    // create password
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    // create user
    const user = new User({
        name,
        email,
        password: passwordHash
    })

    try{

        await user.save()
        res.status(201).json({
            message: "Usuario criado com sucesso"
        })


    } catch(error) {
        console.log(error)
        res.status(500).json({message: "Aconteceu um erro no servidor"})

    }
})

// Login User
app.post("/auth/login", async(req, res) => {
    const { email, password } = req.body

    if(!email) {
        return res.status(422).json({message: "O email é obrigatorio"})
    }
   
    if(!password) {
        return res.status(422).json({message: "A senha é obrigatoria"})
    }

    // check is user exists
    const user = await User.findOne({email: email})

    if(!user) {    
        return res.status(404).json({message: "Usuario não encontrado!"})
    }

    // check  if password match
    const checkPassword = await bcrypt.compare(password, user.password)

    if(!checkPassword) {
        return res.status(422).json({message: "Senha invalida !"})
    }

    try{

        const secret = process.env.SECRET

        const token = jwt.sign(
            {
            id: user._id
            },
            secret
    )

    res.status(200).json({message: "Autenticação realizada com sucesso!", token})

    } catch(err){
        console.log(error)
        res.status(500).json({message: "Aconteceu um erro no servidor"})
    }

})

// Credencials
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS

mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.fo6pr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`).then(() => {
    app.listen(3001)
    console.log("conectou ao banco!")
})
.catch((err) => console.log(err))

