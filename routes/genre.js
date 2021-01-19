const express = require('express')
const Genre = require('../model/genre')
const adminAuth = require('../middlewares/adminAuth')
const router = express.Router()


router.post("/",[adminAuth],async (req,res)=>{

try{
    
    const {name} = req.body;

    const genre = new Genre({name});

    const newGenre = genre.save();
    res.json({
        genre: newGenre
    })
}

catch(error){

    res.status(400).json({
        msg:"validition error"
    })

}

} )
router.delete("/:id",[adminAuth],async (req,res)=>{


    try{

        
    }

    catch(error){


    }
})

//get particular genre name

// router.get("/:id",[adminAuth],async (req,res)=>{


//     try{
//      const name=  await Genre.findById(req.params.id);

//      res.json({genre:name})

//     }

//     catch(error){

//         res.status(500).json({msg:"internal server error"})
//     }
// })

//get all genres
router.get("/all",[adminAuth] ,async (req,res)=>{
    
    try{

        
        const genres = await Genre.find({});

        res.json({
            genres
        })
    }
    catch(error){
        throw error
      //  res.status(500).json({msg:"internal server error"})
    }

})

module.exports = router