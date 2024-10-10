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

// updating users 
app.put('/users/:id', async(req, res) =>{
    try {
        const updateUser = await User.findByIdAndUpdate(req.params.id,
            {
                name: req.body.name,
               email: req.body.email,
                age: req.body.age
            }, 
            {new: true}
        )
        if(!updateUser){
            res.status(404).json({message: "404 not found"})
        }
        res.status(200).json({Message: "update user successfull", data: updateUser})
    } catch (error) {
        console.log(error)
         res.status(500).json({message: "error in updating users"})
    }
})
//delete user 
app.delete('/users/:id', async(req, res) =>{
    try {
       const deleteUser = await User.findByIdAndDelete(req.params.id)
       if(!deleteUser){
           res.status(404).json({message: "404 not found"})
       }
       res.status(200).json({message: `delete user with ID ${req.params.id}`})
    } catch (error) {
       console.log(error)
       res.status(500).json({message: "error in deleting users"})
       
    }
   
   })
   const port = 3000;
app.listen(port, ()=>{
    console.log(`server is listing on http:localhost:${port}`)
})