require('dotenv').config()

const express = require("express")
const app = express()
const mongoose = require("mongoose")

mongoose.connect(process.env.DATABASE,{useNewUrlParser:true,useUnifiedTopology: true})
const db = mongoose.connection
db.on('error',(error) => console.error(error))
db.once('open',() => console.log('connected to Database'))
const port = 2000;

app.use(express.json())

const Todo = require("./routes/Todos")
app.use('/Todos',Todo)


app.listen(port,()=>{ console.log(`server is started on port ${port}`)})