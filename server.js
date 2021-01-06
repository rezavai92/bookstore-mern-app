const express = require('express')
const bodyParser = require('body-parser')
const db = require('./config/db')
const app = express()
const users = require('./routes/users')
const admin = require('./routes/admin')
const author = require('./routes/author')
const book = require("./routes/book")
const auth = require('./routes/auth')
const port =process.env.PORT||3000



app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use('/users/api',users)
app.use("/author/api",author)
app.use("/book/api",book)
app.use('/admin/api',admin)
app.use('/auth/api',auth)

app.listen(port,()=>{

    
    console.log("app is listening to ",port)
})

