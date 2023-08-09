import { useState } from 'react'
import axios from 'axios';
 
function addTodoInput() 
  {
    const [title, setTitle] = useState("");
    const [description, setDecs] = useState("");

  async function addTodo(e){
    e.preventDefault();
    const data = {title, description};
    console.log(data);
    const res = await axios.post('http://localhost:3001/todos',JSON.stringify( data ), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  
  return (
    <div className='add-todo'>
      <form onSubmit={addTodo}>
        <div className='add-todo-btn'>
      <button type='submit'>Add Todo</button>
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

export default addTodoInput;