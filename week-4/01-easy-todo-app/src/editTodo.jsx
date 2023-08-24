import { useState } from 'react'
import axios from 'axios';
import { useEffect } from 'react';
 
export function EditTodo({id, setIsEditing}) 
  {


    const [title, setTitle] = useState("");
    const [description, setDecs] = useState("");

    const _id = id;
/*
    useEffect((_id)=>{
      async function fetchData(_id) {

      }
    },[])

  async function editTodo(e){
    e.preventDefault();
    const data = {title, description};
    console.log(data);
    const res = await axios.post('http://localhost:3000/todos',JSON.stringify( data ), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }*/
  function editTodo(){
    setIsEditing((isEditing)=> !isEditing);
  }
  return (
    <div className='add-todo'>
      <form onSubmit={editTodo}>
        <div className='add-todo-btn'>
      <button type='submit'
      >Done</button>
      </div>
      <div className='add-todo-input'>
        <input type="text" className='title' placeholder={title} value={title} onChange={event => {
          setTitle(event.target.value);
        }} required /><br /><br />
        <input type="text" className='description' placeholder={description} value={description} onChange={event => { setDecs(event.target.value) }} required />
        </div>
      </form>
    </div>
  )
}