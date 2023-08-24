import { useState } from 'react'
import Todo from './todo.jsx'
import AddTodoInput from './AddTodoInput.jsx';
import './App.css'
import { useEffect } from 'react';
import axios from 'axios';
import {useSetRecoilState} from 'recoil';

function App() {
  const [todos, setTodos] = useState([]);
  const [addT, setAddT] = useState(false);



  // fetch all todos from server
  useEffect(() => {

    axios.get('http://localhost:3000/todos')
      .then((response) => { setTodos(response.data) }).catch(err => alert(err.message))
  }, []);

  const listOfTodos = todos.map((todo, index) => <Todo key={index} title={todo.title} completed={todo.completed} description={todo.description} id={todo.id} setTodos={setTodos} />)
  return (
    <>
    {console.log('loop')}
      <div className='head-title'>
        <h1>Todo for Todays</h1>
      </div>
      <div className='section'>
        {listOfTodos}
        <AddTodoInput />
        <br />
      </div>

    </>
  )
}



export default App