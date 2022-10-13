require('dotenv').config()
const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors');

const app = express()
app.use(cors())
app.options('*',cors());
app.use(express.json());


const userSchema = new mongoose.Schema({
    name: String,
    email:{
        type:String,
        required:true
       
    },
    password:{
            type:String,
            required:true
    }
})

const User = new mongoose.model("User",userSchema)



app.post('/register', async (req,res)=>{

    if (!req.body.name&&!req.body.email&&!req.body.password) return res.send("No email/user/password")

   
        const user = new User({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password

        }  ) 

        const newUser = await user.save()
        if(!newUser) return res.status(500).json({mess:"ServerError"})
        return res.send(newUser)

    
    


    
})

app.get('/login', async(req,res) =>{

})

mongoose.connect(process.env.MONGO_URL,()=>{console.log("Database Connected")})
app.listen(3000,()=>{
    console.log('Server listening on port 3000')

})
