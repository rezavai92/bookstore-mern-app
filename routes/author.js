const express = require("express")
const Author = require("../model/author")
const Book = require("../model/book")
const adminAuth = require("../middlewares/adminAuth")
const Language = require("../model/language")
const Genre = require("../model/genre")
//const {body,validationResult} = require("express-validator")
const router = express.Router();

//post author

router.post("/",[adminAuth],async (req,res)=>{

    const {name,language,genre,description} = req.body;

    try{

        const author = new Author({
            name,
            language,
            genre,
            description
        })

        const newAuthor = author.save();

        res.json({author:newAuthor})
    }
    catch(error){
        res.status(400).json({msg:"validition error"})

    }
} )

//get particular author



router.get("/all",async (req,res)=>{

    try{
        
        const authors = await Author.find({}).sort("name").populate("genre","name")
        .populate("language","name");

    //   const modifiedAuthors=  authors.map(async(author)=>{

            
    //                 const genreName = await Genre.findById(author.genre);
    //                 const languageName = await Language.findById(author.language);
    //                 return{
    //                     "_id" : author._id,
    //                     "name":author.name,
    //                     "genre":genreName,
    //                     "language":languageName,
    //                     "description":author.description
    //                 }
    //             }

                
    //     )
    //     console.log(modifiedAuthors)
      // console.log(authors)
        res.json({authors})


    }

    catch(error){

        res.status(500).json({msg:"internal server error"})
    }

})

router.get("/:id",async (req,res)=>{

    try{

        const author= await Author.findById(req.params.id);

        if(author){

            res.json({author:author})
        }

        else{

            res.status(404).json({msg:"not found"})
        }
    }
    catch(error){

        res.status(501).json({msg:"internal server error"})

    }
} )

router.put("/:id",[adminAuth],async (req,res)=>{

    console.log("put")
    const authorId = req.params.id;
    const {name,description,genre,language} =req.body;

    try{

        const updatedAuthor=await Author.findByIdAndUpdate(authorId,{name,description,genre,language})
        res.json({updatedAuthor})
    }

    catch(error){
        throw error;

    }

} )
router.delete("/:id",[adminAuth],async (req,res)=>{

    const authorId = req.params.id;
    
    try{
        const deletedBook=  await Book.deleteMany({author:authorId});
       const deletedAuthor= await Author.findOneAndDelete({_id:authorId});

    
       res.json({msg:"deleted Succeesfully"})
    }

    catch(error){
        res.status(400).json({msg:"validition error"})

    }

} )
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