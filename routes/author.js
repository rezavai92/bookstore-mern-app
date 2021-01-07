const express = require("express")
const Author = require("../model/author")
const adminAuth = require("../middlewares/adminAuth")
const Language = require("../model/language")
const Genre = require("../model/genre")
//const {body,validationResult} = require("express-validator")
const router = express.Router();

router.get("/all",[adminAuth],async (req,res)=>{

    try{
        
        const authors = await Author.find({});

        res.json({authors})


    }

    catch(error){

        res.status(500).json({msg:"internal server error"})
    }

})

router.post('/register',[adminAuth],async (req,res)=>{
    
const {name,language,genre,description} = req.body;
try{
const foundLang = await Language.findById(language);
const foundGenre = await Genre.findById(genre);
if(foundLang && foundGenre ){
    const author =new Author({name,language:foundLang.id,genre:foundGenre.id,description});
    author.save().then((auth)=>{


        res.json({msg:{
            author:auth
        }})
    
    
     }).catch((error)=>{
    
        console.log(error)
        res.status(500).json({msg:"internal server error"})
     })
}

}

catch(error){


}
 

 
    
})

module.exports = router;