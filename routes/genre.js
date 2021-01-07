const express = require('express')
const Genre = require('../model/genre')
const adminAuth = require('../middlewares/adminAuth')
const router = express.Router()

router.get("/all",[adminAuth] ,async (req,res)=>{
    
    try{

        const genres = await Genre.find({});

        res.json({
            genres
        })
    }
    catch(error){

        res.status(500).json({msg:"internal server error"})
    }

})

module.exports = router