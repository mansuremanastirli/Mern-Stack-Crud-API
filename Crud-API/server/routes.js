const express = require("express")
const userModel = require("./userModel")

const app = express()


app.use(express.json())


const router = express.Router()


// database ' den verileri çekmek
router.get("/getposts", async (req, res) => {
    try {
        const getposts = await userModel.find()

        return res.status(200).json((getposts))

    } catch (error) {
        console.log(error)
        return res.status(404).json({ message: error.message })
    }
})

//database ' e veri kaydetmek
router.post("/", async (req, res) => {
    try {
        const { title, comment,} = req.body
      
        if(title.length > 30){
            return res.status(400).json({ message: "title Cannot be longer than 30 characters" })
        } 
       else if(comment.length > 80){
            return res.status(400).json({ message: "comment Cannot be longer than 80 characters" })
        } 
       
        
        const createdPost = await userModel.create({
            title,
            comment,
        })
        console.log(createdPost)
        return res.status(201).json({message: "Created Successful"})



    } catch (error) {
        return res.status(400).json({ message: error.message })
    }


})



// databasede ki veriyi güncellemek
router.put("/update/:id", async (req, res) => {
    try {
        const id = req.params.id
        const { title, comment} = req.body
        
        if(title.length > 30){
            return res.status(400).json({ message: "title cannot be longer than 30 character" })
        } 
       else if(comment.length > 80){
            return res.status(400).json({ message: "comment cannot be longer than 80 character" })
        } 
        
        if(title == "" || comment == ""){
            return res.status(400).json({message: "title or comment cannot be empty"})
        }

        const updatedPost = await userModel.findByIdAndUpdate(id, { title, comment}, { new: true })

        return res.status(200).json({message: "Post Updated"})

    } catch (error) {
        return res.status(404).json({ message: error.message })
    }

})

// database ' den veri silmek
router.delete("/delete/:id", async (req, res) => {
    try {
       
        const id = req.params.id
        const deletedPost = await userModel.findByIdAndDelete(id)

        return res.status(200).json({message: "Post Deleted"}) 

    } catch (error) {
        return res.status(404).json({ message: error.message })
    }


})


module.exports = router