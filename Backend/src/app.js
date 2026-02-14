const express = require("express")
const app = express()
const noteModel = require("./models/notes.model")
const cors = require("cors")
const path = require("path")
app.use(express.json())
app.use(cors())

app.post("/notes",async(req, res)=>{
    const{title, description} = req.body
  const notes = await noteModel.create({
    title , description
})
res.status(201).json({
    message : "notes are created successfully",
  
})
})
app.get("/notes", async(req, res)=>{
  const notes = await noteModel.find()
  res.status(200).json({
    message: "notes fetches successfully",
    notes
  })

})
app.delete("/notes/:id",async(req,res)=>{
   const id = req.params.id
  const notes = await noteModel.findByIdAndDelete(id)
   res.status(200).json({
    message: "notes deleted sucessfully",
    
   })
   
})
app.patch("/notes/:id",async(req,res)=>{
  const id = req.params.id
  const{description} = req.body
  const notes = await noteModel.findByIdAndUpdate(id, {description})
  res.status(200).json({
    message:"notes updated successfully",
    
  })

})
app.use(express.static("./public"))
app.use('*name',(req, res)=>{
  res.sendFile(path.join(__dirname,"..","/public/assets/index.html"))
})
module.exports = app