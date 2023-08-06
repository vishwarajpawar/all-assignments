import { useState } from 'react'
import Todo from './todo.jsx'
import './App.css'

function App() {
  const [todos, setTodos] = useState([{"title":"now see","completed":false,"description":"this looks more dynamic","id":"61dcba48-4d27-40df-b03e-3129955d9b56"},{"title":"now see","completed":false,"description":"this looks more dynamic","id":"bd327b35-7a7e-4607-92a5-45cb19a9889e"},{"title":"now now see see","completed":false,"description":"this looks more dynamic","id":"f0f3dc25-3d38-401e-acf0-dcb76f02e521"}])
    // fetch all todos from server
  const listOfTodos = todos.map( (todo,index) => <Todo key={index} title={todo.title} completed={todo.completed} description={todo.description} id={todo.id}/>)
  return (
    <>
      <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
        {listOfTodos}
      </div>
    </>
  )
}



export default App