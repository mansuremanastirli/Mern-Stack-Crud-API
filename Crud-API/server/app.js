const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const router = require("./routes")
const bodyParser = require("body-parser")
const cors = require("cors")


dotenv.config()

const app = express()

const PORT = process.env.PORT || 5000

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

app.use("/posts" , router )



app.listen(PORT , ()=>{
    mongoose.connect(process.env.DB_CONNECTION_STRING , (err)=>{
        if(err) throw err
        console.log("connected to database")
    })
    console.log("server dinleniyor")
})