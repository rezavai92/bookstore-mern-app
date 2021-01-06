const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const languageSchema = new Schema({

    name:{
        type:String,
        required:true
    },

    shortForm:{
        type:String
    }
})

const Language = mongoose.model("languages",languageSchema)
module.exports = Language;
