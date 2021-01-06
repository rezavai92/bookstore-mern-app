const express = require('express')
const config = require('config')
const {body,validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const router = express.Router();
const jwt = require("jsonwebtoken")
const Admin = require('../model/admin')


//admin sign up
router.post('/register',[
    
body("email").isEmail(),
body("password").isLength({min:8})],async (req,res)=>{

    const errors = validationResult(req);
    
    if(!errors.isEmpty()){
        res.status(400).json({errors:errors.array()})
    }
   
    const {name,email,shift,password}= req.body
   
    try{
    let foundAdmin = await Admin.findOne({email})

    if(foundAdmin){

      return  res.status(400).json({msg:"email already taken"})
    }

    const salt = bcrypt.genSaltSync(10);
   
    const newPass = bcrypt.hashSync(password,salt)
    const admin = new Admin({name,email,password,shift})
    admin.password = newPass;
   
   

    admin.save().then((admin)=>{
   
   
       const payload ={
           admin:{
               id : admin.id
           }
       }
       
       jwt.sign(payload,config.get('jwtSecret'),{expiresIn:"1d"},(error,encoded)=>{
   
           if(error){
               throw error;
           }
           res.json({token:encoded})
       })
   
    }).catch((error)=>{
   
       res.status(500).json({msg:"internal server error"})
    })
   

    }
    catch(error){

        res.status(500).json({msg:"internal server error"})
    }

    
   
   
    } 
    )

module.exports= router;