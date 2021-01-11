const express = require('express')
const adminAuth = require('../middlewares/adminAuth')
const Book = require("../model/book")
const Author = require("../model/author")
const Publisher = require("../model/publisher")
let fs = require('fs'); 
let path = require('path'); 
let multer = require('multer'); 

let upload = multer({ dest: 'uploads/' })
const Genre = require("../model/genre")
const Language = require("../model/language")
const router = express.Router()

//get all books



router.get("/all",async (req,res)=>{

    try{

        
       const books= await Book.find({}).sort("name")
       .populate("genre","name").populate("language","name").
       populate("author","name").populate("publisher","name")
       
       ;

       res.json({books})

    }

    catch(error){

        res.status(500).json({msg:"internal server error"})

    }
})

// update a book

router.put("/:id",[adminAuth,upload.single("photo")],async (req,res)=>{

    let profileFields={}
    if(req.file){
      profileFields={photo :{data:null}}
    
     profileFields.photo.data = fs.readFileSync(req.file.path)   
   
    }
    
    const{name,isbn,author,publisher,genre,language,page,price,availability,description} = req.body;


    profileFields.name=name;
    profileFields.isbn=isbn;
    profileFields.author=author;
    profileFields.publisher=publisher;
    profileFields.availability = availability;
    profileFields.genre=genre;
    profileFields.language=language;
    profileFields.page=page;
    profileFields.price = price;
    profileFields.description=description;

        try{
           const updatedBook= await Book.findByIdAndUpdate(req.params.id,profileFields,{useFindAndModify:false})

            res.json({updatedBook})

        }

        catch(error){

            res.status(500).json({msg:"internal server error"})
        }
})

// delete a book

router.delete("/:id",[adminAuth],async (req,res)=>{

    try{
        const deletedBook =await Book.findByIdAndDelete(req.params.id);
        res.json({deletedBook})
    }

    catch(error){
        res.status(500).json({msg:"internal server error"})
    }

})

router.post("/",[upload.single('photo'),adminAuth],async (req,res)=>{

    
    const {name,isbn,author,price,page,description,genre,publisher,language,availability}=req.body;
    
    let profileFields={}
    if(req.file){
      profileFields={photo :{data:null}}
    
     profileFields.photo.data = fs.readFileSync(req.file.path)   
   
    }
    
 //   const{name,isbn,author,publisher,genre,language,page,price,availability,description} = req.body;


    profileFields.name=name;
    profileFields.isbn=isbn;
    profileFields.author=author;
    profileFields.publisher=publisher;
    profileFields.availability = availability;
    profileFields.genre=genre;
    profileFields.language=language;
    profileFields.page=page;
    profileFields.price = price;
    profileFields.description=description;

        try{
           const book= new Book(profileFields);

           const newBook = await book.save();



            res.json({newBook})

        }

        catch(error){

            res.status(500).json({msg:"internal server error"})
        }

})

module.exports = router;