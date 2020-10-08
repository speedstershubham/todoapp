require('dotenv').config()

const express = require("express")
const app = express()
const mongoose = require("mongoose")
const cors = require("cors")


mongoose.connect(process.env.DATABASE,{useNewUrlParser:true,useUnifiedTopology: true,useCreateIndex:true})
const db = mongoose.connection
db.on('error',(error) => console.error(error))
db.once('open',() => console.log('connected to Database'))
const port = process.env.PORT || 2000;

app.use(cors())
app.use(express.json())

const Todo = require("./routes/Todos")
const User = require("./routes/Users")
const Auth = require("./routes/auth")


app.use('/Todo',Todo)
app.use('/User',User)
app.use('/',Auth)



app.listen(port,()=>{ console.log(`server is started on port ${port}`)})