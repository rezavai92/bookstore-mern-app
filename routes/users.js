const express = require('express')
const jwt = require('jsonwebtoken')
const User = require('../model/user')
const bcrypt = require('bcryptjs')
const config =require('config')
const {body,validationResult} = require('express-validator')
const router = express.Router()


router.post('/register',
[body("email").isEmail(),
body("password").isLength({min:5})

],async (req,res)=>{

    const errors = validationResult(req)

    if (!errors.isEmpty()){

        res.status(400).json({errors:errors.array()})
    }


    const {name,email,password} = req.body;


    try{
        let foundUser = await User.findOne({email})
    
        if(foundUser){
    
          return  res.status(400).json({msg:"email already taken"})
        }
        }
        catch(error){
    
            res.status(500).json({msg:"internal server error"})
        }
        
    const salt = bcrypt.genSaltSync(10)

    const newPass = bcrypt.hashSync(password,salt)

    const user = new User({name,email,password});

    user.password= newPass;
    user.save().then((u)=>{

        const payload ={
            user :{
                id : u.id
            }
        }

        jwt.sign(payload,config.get("jwtSecret"),{expiresIn:"30d"},
            (err,token)=>{
                
                if(err){
                    throw err
                }

                res.json({token:token})

            }
        )

    }).catch((error)=>{

        console.log(error)
        res.status(500).json({msg:"user validation failed"})

    })


    

})

module.exports =router;