const express = require('express')
const Language = require('../model/language')
const adminAuth = require('../middlewares/adminAuth')
const router = express.Router()

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