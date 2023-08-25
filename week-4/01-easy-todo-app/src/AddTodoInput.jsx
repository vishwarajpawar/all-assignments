/* eslint-disable no-unused-vars */
import { useState } from 'react';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import { todosState } from './store/atoms/todos';

import { Card, Typography, IconButton, TextareaAutosize } from '@mui/material';
import { TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

function AddTodoInput() {
  const [title, setTitle] = useState(' ');
  const [description, setDecs] = useState(' ');
  const setTodos = useSetRecoilState(todosState);

  async function addTodo(e) {
    e.preventDefault();
    const data = { title, description };
    console.log(data);
    await axios.post('http://localhost:3000/todos', JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const res = await axios
      .get('http://localhost:3000/todos')
      .catch((err) => alert(err.message));
    setTodos(res.data);
    setTitle(' ');
    setDecs(' ');
  }

  return (
    <Card className='add-todo'>
      <form onSubmit={addTodo}>
        <div className='add-todo-btn'>
          <IconButton type='submit' size='medium' aria-label='Add'><AddIcon fontSize='medium'/></IconButton>
        </div>
        <div className='add-todo-input'>
          <TextField
            className='title'
            id='standard-required'
            variant='standard'
            defaultValue={title}
            label='Title'
            value={title}
            size='small'
            onChange={(event) => {
              setTitle(event.target.value);
            }}
            required
          />

          <TextField
            className='description'
            id='standard-required'
            variant='standard'
            defaultValue={description}
            label='Description'
            value={description}
            size='small'
            onChange={(event) => {
              setDecs(event.target.value);
            }}
            required
          />
        </div>
      </form>
    </Card>
  );
}

export default AddTodoInput;
