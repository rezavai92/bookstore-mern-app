const express = require('express')
const adminAuth = require('../middlewares/adminAuth')
const Publisher = require('../model/publisher')
const router = express.Router();

router.post("/",[adminAuth],(req,res)=>{

    const {name,description} = req.body;

    const publisher = new Publisher({
        name,
        description
    });

    publisher.save().then(
        (pub)=>{
            res.json({msg:"saved successfully"})

        }

    ).catch((err)=>{

        res.status(500).json({
            msg:"internal server error"
        })


    })

} )

//get all publishers


router.get("/all",[adminAuth], async (req,res)=>{

    try
    {
  const publishers= await   Publisher.find({}).sort("name");

  res.json({publishers})
}
catch(error){

    res.status(500).json({msg:"internal server error"})

}
})

module.exports =router;