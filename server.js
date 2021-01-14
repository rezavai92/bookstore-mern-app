const express = require('express')
const bodyParser = require('body-parser')
const db = require('./config/db')
const app = express()
const users = require('./routes/users')
const admin = require('./routes/admin')
const author = require('./routes/author')
const book = require("./routes/book")
const auth = require('./routes/auth')
const language = require('./routes/language')
const publisher = require('./routes/publisher')
const genre  = require('./routes/genre')

const payment = require('./routes/payment')
const port =process.env.PORT||5000



app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use('/api/users',users)
app.use("/api/authors",author)
app.use("/api/book",book)
app.use('/api/admin',admin)
app.use('/api/auth',auth)
app.use('/api/langs',language)
app.use('/api/genres',genre)
app.use('/api/publishers',publisher)
app.use('/api/payment',payment )
app.listen(port,()=>{


    
    console.log("app is listening to ",port)
})

