const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors')

const app = express();
app.use(cors())
app.use(express.json());

const mongoUrl = 'mongodb://127.0.0.1:27017/user_managment'

mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() =>{
    console.log("mongodb connection working")
}).catch((err) =>{  
    console.log('mongodb connection error', err.message)
})

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number
})

const User = mongoose.model("User", userSchema) //there will be singular name

//FETCHING  ALL USER
app.get('/users', async(req, res) =>{
  try {
    const users = await  User.find();
    res.status(200).json({message: "fetching all users", data: users})
  } catch (error) {
    console.log(error)
    res.status(500).json({message: "error in fetching users"})
  }
})

//CREATE USERS
app.post('/users', async(req, res) =>{
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        age: req.body.age
    })
    try {
       const allUser = await newUser.save()
       res.status(200).json({message: "creating new user successful", data: allUser})
    } catch (error) {
        console.log(error)
         res.status(500).json({message: "error in creating users"})
    }
})

