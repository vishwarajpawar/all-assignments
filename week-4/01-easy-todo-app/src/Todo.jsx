/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import axios from "axios";

function Todo(props) {
    // Add a delete button here so user can delete a TODO.
    const {title, completed, description, id, setTodos} = props;

    return <div key={id} style={{margin: '5px'}} className='todo'>
        <div className="todo-del-btn">
        <label htmlFor=""> <input type="checkbox" defaultChecked={completed}/></label>
         <button onClick={
            () => {
                axios.delete('http://localhost:3001/todos/'+id)
                .then((res) => {
                    axios.get('http://localhost:3001/todos').then((response) => {setTodos(response.data)});
                
                });
            }
        }>Delete</button></div>
        <h4 className="title">{title}</h4>
       <label htmlFor=""></label> <p className="decription">{description}</p>
        
       
    </div>
}

export default Todo;