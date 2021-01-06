const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const publisherSchema = new Schema({

    name:{
        type:String
    },
    language:{
        type:String
    },
    description :{
        type:String
    }
})

const Publisher = mongoose.model("Publishers",publisherSchema);
module.exports = Publisher;