const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bookSchema = new Schema({
    
    name:{
        type:String,
        required:true,
        trim:true
    },

    isbn:{
        type:Number,
        required:true,
        trim:true
    },
    genre:{
        type:Schema.Types.ObjectId,
        ref:"genres"
    },
    language:{
        type :Schema.Types.ObjectId,
        ref:"languages"
    },
    author:{
        type: Schema.Types.ObjectId,
        ref:"authors",
        required:true
    },
    page:{
        type:Number
    },
    price:{
        type:Number
    },
    availability:{
        type:Boolean
    }
})

const Book = mongoose.model('books',bookSchema)
module.exports = Book;
