const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt= require('bcryptjs')
const Admin = require('../model/admin')
const config = require('config')
const User = require('../model/user')
const adminAuth = require("../middlewares/adminAuth")
const {body,validationResult} = require('express-validator')

const router = express.Router();


//get user 

router.get('/admin',[adminAuth],async(req,res)=>{

    try{
    const admin = await Admin.findById(req.admin.id).select("-password")

    res.json({
        admin:admin
    })
    }

    catch(error){

        res.status(500).json({msg:"internal server error"})
    }
} )
router.post('/login',[
                body("email").isEmail(),
                body("password").isLength({min:5})
],async (req,res)=>{
const errors = validationResult(req);

if(!errors.isEmpty()){
    res.status(400).json({errors:errors.array()})
}
const {email,password} = req.body;

try{
const foundUser = await User.findOne({email});
if(!foundUser){

    res.status(404).json({msg:"no user found"})
    
}

let isMatch = await bcrypt.compare(password,foundUser.password)

if(!isMatch){
    res.status(400).json({msg:"authorization denied"})
}

const payload = {
    user :{
        id : foundUser.id
    }
}

jwt.sign(payload,config.get("jwtSecret"),(error,token)=>{

    if(error){
        throw error
    }

    res.cookie("xAuthToken",token).json({token:token})
})
}
catch(e){

    console.log(e)
    res.status(500).json({"msg":"internal server error"})

}

})

//user log out 

router.get('/logout',(req,res)=>{

    res.clearCookie("xAuthToken").json({msg:"logged out"})
})

//admin log in

router.post('/admin/login',[
    body("email").isEmail()
],async (req,res)=>{
const errors = validationResult(req);

if(!errors.isEmpty()){
res.status(400).json({errors:errors.array()})
}
const {email,password} = req.body;

try{
const foundAdmin = await Admin.findOne({email});
if(!foundAdmin){

return res.status(404).json({msg:"not found"})

}

let isMatch = await bcrypt.compare(password,foundAdmin.password)

if(!isMatch){
res.status(400).json({msg:"authorization denied"})
}

const payload = {
admin :{
id : foundAdmin.id
}
}

jwt.sign(payload,config.get("jwtSecret"),{expiresIn:"1d"},(error,token)=>{

if(error){
throw error
}

res.cookie("axdxmxixn",token).json({token:token})
})
}
catch(e){

console.log(e)
res.status(500).json({"msg":"internal server error"})

}

})
//admin log out


router.get('/admin/logout',(req,res)=>{


    res.status(200).clearCookie("axdxmxixn").json({msg:"logged out"});

})

module.exports=router;