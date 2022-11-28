const mongoose = require("mongoose")

const postSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    comment:{
        type:String,
        required:true
    },
    time:{
        type: Date,
        default: Date.now()
    }
    
})

module.exports = mongoose.model("post" , postSchema)