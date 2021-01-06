const express = require('express')
const jwt = require('jsonwebtoken')
const config = require('config')


module.exports = async function (req,res,next){

let token = req.header('xAuthToken');
if(!token){
  return  res.status(400).json({msg:"authorizaiton denied"})
}

try {
 const deCoded= await jwt.verify(token,config.get('jwtSecret'));

 req.user =deCoded.user;
 next()
}
catch(error){

    res.status(401).json({msg:"invalid token"})
}

}