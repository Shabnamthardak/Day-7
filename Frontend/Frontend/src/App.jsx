import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'


const App = () => {
 
  const [notes, setNotes] = useState([])
  console.log("hello integration")
  function fetchNotes(){
    axios.get('http://localhost:3000/notes')
  .then((res)=>{
   setNotes(res.data.notes)
  }) 
  }
useEffect(()=>{
  fetchNotes()
}, [])
function onSubmithandler(e){
  e.preventDefault()

  const{title , description} = e.target.elements
  console.log(title.value,description.value)

  axios.post('http://localhost:3000/notes',{
    title:title.value,
    description:description.value
  })
  .then(res=>{
    console.log(res.data)
fetchNotes()
  })}
  function onUpdatehandler(noteId){
  axios.patch("http://localhost:3000/notes/"+noteId,
{
  description:" updated description"
}
  ).then(res=>{
    console.log(res.data)
    fetchNotes()
  })
  }
  function deleteHandler(noteId){
  axios.delete("http://localhost:3000/notes/"+noteId)
  .then(res=>{
    console.log(res.data)
  fetchNotes()

})
  }

  return (
    <div>
      <form className='notes-form'onSubmit={onSubmithandler}>
        <input  name = 'title' type="text" placeholder="Enter your title"></input>
        <input name ="description" type ="text" placeholder = "Enter your description"></input>
        <button className='btn'>submit Notes</button>
        </form>
      <div className="notes">
        {notes.map(note=>  {
          return(<div className="note"key={note._id}>
          <h1>{note.title}</h1>
          <p>{note.description}</p>
          <button onClick={()=>{deleteHandler(note._id)}}>Delete</button>
          <button onClick={()=>{onUpdatehandler(note._id)}}>Update</button>
        </div>
          )
        })}
      </div>
    </div>
  )
}

export default App
