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

const userSchema = new mongoose.connect({
  name: String,
  email: String,
  age: Number
})

const User = mongoose.model("User", userSchema) //there will be singular name

//FETCHING  ALL USER
app.get('/user', async(req, res) =>{
  try {
    const users = await  User.find();
    res.json(users)
  } catch (error) {
    console.log(error)
  }
})