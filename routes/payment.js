const express = require('express')
const adminAuth = require('../middlewares/adminAuth')
const {body,validationResult} = require('express-validator')
const Payment = require('../model/payment')

const router = express.Router();

//get all payment record

router.get('/all',[adminAuth],async (req,res)=>{

    try{
        const payments = await Payment.find({}).sort("-date");

        res.json({payments})

    }
    catch(error){

        res.status(500).json({msg:"internal server error"})
    }
    
} )

//post payment info
 
router.post('/',[body("name").notEmpty(),
                [body("phone").notEmpty(),
                body("address").notEmpty(),
                body("bkash").notEmpty(),
                
                body("order").notEmpty(),
                body("total").notEmpty()
             ]

],async (req,res)=>{

    const errors = validationResult(req);

    if(!errors.isEmpty()){

      return  res.status(400).json( {msg:errors.array()})
    }

    const {name,phone,address,bkash,order,total} = req.body;

    if(order.itemInfo.length===0){
        return res.status(400).json({msg:"validation error,empty cart"})
    }
    const payment = new Payment({name,phone,address,bkash,order,total})
    try{

        const newPayment = await payment.save();

        res.json({newPayment})
    }

    catch(error){
        res.status(500).json({msg:"internal server error"})

    }


})


module.exports =router;