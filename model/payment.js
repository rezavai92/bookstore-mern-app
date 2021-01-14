const mongoose = require('mongoose')

 const paymentSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true,
        trim :true
    },
    phone:{
        type:String,
        required:true,
        trim:true,
        
    },
    address:{
        type:String,
        required:true
    },
    total:{type:Number,required:true},
    
    order:
    
       {    
            itemInfo: [{
            bookId :{type:mongoose.Schema.Types.ObjectId,ref:"books"},
            bookName :{type:String,required:true},
            pricePerUnit:{type:Number,required:true},
            unit:{type:Number,required:true},
            totalPricePerItem:{type:Number,required:true},
            




        },
        
    ],
    
    
    total:{type:Number,required:true},


}
        
    ,

   bkash :{
       type:String,
       required:true
   } 
   ,
    date:{
        type:Date,
        default : Date.now
    }
 })

 const Payment = mongoose.model("payments",paymentSchema);

 module.exports= Payment