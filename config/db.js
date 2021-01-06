const mongoose = require('mongoose')
const config = require('config')
const url = config.get("mongoURL")
mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true},(error,response)=>{

if(error){

    return console.log(error)
}

console.log("db connected")
})