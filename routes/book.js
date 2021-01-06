const express = require('express')
const adminAuth = require('../middlewares/adminAuth')
const Book = require("../model/book")
const Author = require("../model/author")
const Genre = require("../model/genre")
const Language = require("../model/language")
const router = express.Router()

router.post("/register",[adminAuth],async (req,res)=>{

    const {name,isbn,author,price,page,description,genre,language,availability}=req.body;
    
    try{

        const foundLang = await Language.findById(language);
        const foundGenre= await Genre.findById(genre);
        const foundAuthor = await Author.findById(author);
        
        if(foundLang && foundGenre && foundAuthor){
            const book = new Book ({name,isbn,author:foundAuthor.id,genre:foundGenre.id,language:foundLang.id,price,page,description,availability});

            book.save().then((b)=>{

                res.json({
                    msg:{
                        book:b
                    }
                })

            }).catch(err=>{

                res.status(500).json({msg:"internal server error"})
                
            })

        }
    }
    catch(error){


    }


})

module.exports = router;