import { useState } from 'react';
import Todo from './todo.jsx';
import AddTodoInput from './AddTodoInput.jsx';
import './App.css';
import { useEffect } from 'react';
import axios from 'axios';
import { RecoilRoot, useRecoilState } from 'recoil';
import { todosState } from './store/atoms/todos.js';
import { titleState } from './store/atoms/title.js';
import { descriptionState } from './store/atoms/description.js';

function App() {
  const [todos, setTodos] = useRecoilState(todosState);
  //const [addT, setAddT] = useState(false);
  

  const init = async () => {
    const response = await axios
      .get('http://localhost:3000/todos')
      .catch((err) => alert(err.message));
    setTodos(response.data);
  };

  useEffect(() => {
    init();
  }, []);

  // fetch all todos from server

  const listOfTodos = todos.map((todo, index) => {

    return  <Todo
      key={index}
      todo = {todo}
    />;
  });
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
  );
}

export default App;
