/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import axios from "axios";
import { useState } from "react";
import { EditTodo } from "./editTodo";

function Todo(props) {
    // Add a delete button here so user can delete a TODO.
    const { title, completed, description, id, setTodos } = props;
    const [isEditing, setIsEditing] = useState(false);

    function edit(){
        
    }

    return <>
        <div key={id} style={{ margin: '5px' }} className='todo'>
        {console.log('jerer')}
        <div className="todo-del-btn">
            <label htmlFor=""> <input type="checkbox" defaultChecked={completed} /></label>
            
            <div className="btn-class">
            <button onClick={() =>{
                setIsEditing((editing) =>{ !editing})}}>Edit</button>
                <button onClick={
                    () => {
                        axios.delete('http://localhost:3000/todos/' + id)
                            .then((res) => {
                                axios.get('http://localhost:3000/todos').then((response) => { setTodos(response.data) });
                                
                            });
                    }
                }>Delete</button>
               </div>
        </div>

    
        <h4 className="title">{title}</h4>
        <label htmlFor=""></label> <p className="decription">{description}</p>
    
    </div>
    </>
}

export default Todo;