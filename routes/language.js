const express = require('express')
const Language = require('../model/language')
const adminAuth = require('../middlewares/adminAuth')
const router = express.Router()

router.post("/",[adminAuth],async (req,res)=>{

    try{

        const {name} = req.body;
        const language = new Language({name:name});
        const lang = await language.save();
        res.json({
            language:lang
        })
    }
    catch(error){

        res.status(400).json({msg:"validition error"})

    }
})

router.get("/all",[adminAuth] ,async (req,res)=>{
    
    try{

        const languages = await Language.find({});

        res.json({
            languages:languages
        })
    }
    catch(error){

        res.status(500).json({msg:"internal server error"})
    }

})

module.exports = router