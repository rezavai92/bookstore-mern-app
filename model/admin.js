const mongoose = require('mongoose')

 const adminSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true,
        trim :true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
    },
    shift:{
        type:String,
        required:true
    },

    password:{
        type:String,
        required:true,
        
    },
    date:{
        type:Date,
        default : Date.now
    }
 })

 const Admin = mongoose.model("admin",adminSchema);

 module.exports= Admin