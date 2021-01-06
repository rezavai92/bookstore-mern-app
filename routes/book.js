const express = require('express')
const adminAuth = require('../middlewares/adminAuth')
const Book = require("../model/book")
const Author = require("../model/author")
const Publisher = require("../model/publisher")
const Genre = require("../model/genre")
const Language = require("../model/language")
const router = express.Router()

router.post("/register",[adminAuth],async (req,res)=>{

    
    const {name,isbn,author,price,page,description,genre,publisher,language,availability}=req.body;
    
    try{

        const foundLang = await Language.findById(language);
        const foundGenre= await Genre.findById(genre);
        const foundAuthor = await Author.findById(author);
        const foundPublisher = await Publisher.findById(publisher);
        
        if(foundLang && foundGenre && foundAuthor && foundPublisher){
            const book = new Book ({name,isbn,publisher:foundPublisher.id,author:foundAuthor.id,genre:foundGenre.id,language:foundLang.id,price,page,description,availability});

            book.save().then((b)=>{

                res.json({
                    msg:{
                        book:b
                    }
                })

            }).catch((err)=>{

                res.status(500).json({msg:"internal server error"})
                
            })

        }
        else{
            res.status(400).json({msg:"validation error"})
        }
        
    }
    catch(error){

        res.status(500).json({msg:"internal server error"})
    }


})

module.exports = router;