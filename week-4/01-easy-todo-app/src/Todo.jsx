/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import axios from 'axios';
import { useEffect, useState } from 'react';
import { EditTodo } from './editTodo';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { todosState } from './store/atoms/todos';
import {Card, Typography, IconButton} from '@mui/material';
import PlaylistAddCheckTwoToneIcon from '@mui/icons-material/PlaylistAddCheckTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EditNoteTwoToneIcon from '@mui/icons-material/EditNoteTwoTone';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import { titleState } from './store/atoms/title';
import { descriptionState } from './store/atoms/description';

//isEditing===true?alert(isEditing):alert(isEditing)
function Todo(props) {
  // Add a delete button here so user can delete a TODO.
  const todo = props.todo;
  const [isEditing, setIsEditing] = useState(false);
  const [isComplete, setIsCompleted] = useState(todo.completed);
  const [complete, setComplete] = useState('none');
  const setTodos = useSetRecoilState(todosState);
const [title, setTitle] = useState(todo.title);
const [description, setDescription] = useState(todo.description);


useEffect(()=> {
  if(isComplete){
    setComplete('line-through');
  }
},[])

const process = async () => {
  if (!isComplete) {
    setComplete('line-through');
    const completed = (!isComplete); 
    const data = {completed};
    const res = await axios
      .put('http://localhost:3000/todos/' + todo.id, JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(async (res) => {
        await axios.get('http://localhost:3000/todos').then((response) => {
          setTodos(response.data);
          
        });
      });
  }
  else{
    setComplete('none');
    
    const completed = !isComplete;
    const data = { completed };
    const res = await axios
      .put('http://localhost:3000/todos/' + todo.id, JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(async (res) => {
        await axios.get('http://localhost:3000/todos').then((response) => {
          setTodos(response.data);
          console.log(data);
        });
      });
  }
};
  function completedTodo() {
    console.log(isComplete);
    setIsCompleted((c) => !c);
    process();
  }


function editTodo(){
    setIsEditing((isEditing)=> !isEditing);
  }
  return (
    <>
      {isEditing ? (
        <EditTodo
          id={todo.id}
          setIsEditing={setIsEditing}
          title={title}
          description={description}
          setTitle={setTitle}
          setDescription={setDescription}
        />
      ) : (
        <Card
          key={todo.id}
          style={{ margin: '5px' }}
          className='todo'
          variant='outlined'
        >
          <div className='todo-del-btn'>
            <IconButton
              onClick={completedTodo}
              aria-label='check'
              size='medium'
            >
              <DoneOutlineIcon fontSize='medium' />
            </IconButton>

            <div className='btn-class'>
              <IconButton onClick={editTodo} aria-label='edit' size='medium'>
                <EditNoteTwoToneIcon fontSize='medium' />
              </IconButton>
              <IconButton
                aria-label='delete'
                size='medium'
                onClick={() => {
                  axios
                    .delete('http://localhost:3000/todos/' + todo.id)
                    .then((res) => {
                      axios
                        .get('http://localhost:3000/todos')
                        .then((response) => {
                          setTodos(response.data);
                        });
                    });
                }}
              >
                <DeleteTwoToneIcon fontSize='medium' />
              </IconButton>
            </div>
          </div>
          
          <div className='content' style={{ textDecoration: complete}}>
            <Typography
              className='title'
              variant={'h6'}
              component={'h6'}
              color='text.secondary'
            >
              {title}
            </Typography>
            <Typography className='decription' variant={'body2'}>
              {description}
            </Typography>
          </div>
        </Card>
      )}
    </>
  );
}

export default Todo;
