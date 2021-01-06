const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const authorSchema = new Schema({

    name:{
        type:String,
        required:true
    },
    language:{
        type: Schema.Types.ObjectId,
        ref:"languages"
    },
    genre:{
        type:Schema.Types.ObjectId,
        ref:"genres"
    },
    description:{
        type:String
    }
})


const Author = mongoose.model("authors",authorSchema)

module.exports=Author