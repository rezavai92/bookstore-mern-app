
const jwt = require('jsonwebtoken')
const config = require('config')


module.exports = function (req,res,next){

const token = req.header('axdxmxixn');

if(!token){
  return  res.status(400).json({msg:"authorizaiton denied"})
}

try {
 const deCoded=  jwt.verify(token,config.get('jwtSecret') );

 req.admin =deCoded.admin
 
 next()
}
catch(error){

    
    res.status(401).json({msg:"invalid token"})
}

}