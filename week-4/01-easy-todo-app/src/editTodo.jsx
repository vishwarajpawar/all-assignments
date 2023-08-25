
import { useState } from 'react';
import axios from 'axios';
import { Card, IconButton, TextField } from '@mui/material';
import { useEffect } from 'react';
import DoneIcon from '@mui/icons-material/Done';
export function EditTodo({ id, setIsEditing, title, description,  setTitle, setDescription}) {
 

  const _id = id;

  useEffect(() => {
    async function fetchData(_id) {
      const res = await axios
        .get('http://localhost:3000/todos/' + _id)
        .catch((error) => {
          alert(error);
        });
    }
    fetchData(_id);
  }, []);

  async function editTodo(e){
    e.preventDefault();
    const data = {title, description};
    console.log(data);
    const res = await axios.put('http://localhost:3000/todos/'+_id,JSON.stringify( data ), {
      headers: {
        'Content-Type': 'application/json'
      }
    }).catch((error)=>{alert(error.message)});

     setIsEditing((isEditing) => !isEditing);
  } 
 /* function editTodo() {
    setIsEditing((isEditing) => !isEditing);
  }*/
  return (
    <Card className='add-todo'>
      <form onSubmit={editTodo}>
        <div className='add-todo-btn'>
          <IconButton type='submit' size='medium'><DoneIcon size='medium'/></IconButton>
        </div>
        <div className='add-todo-input'>
          <TextField
            type='text'
            className='title'
            defaultValue={title}
            id='standard'
            variant='standard'
            value={title}
            label="Title"
            size='small'
            onChange={(event) => {
              setTitle(event.target.value);
            }}
            required
          />

          <TextField
            className='description'
            defaultValue={description}
            value={description}
            variant='standard'
            label="Description"
            size='small'
            onChange={(event) => {
              setDescription(event.target.value);
            }}
            required
          />
        </div>
      </form>
    </Card>
  );
}
