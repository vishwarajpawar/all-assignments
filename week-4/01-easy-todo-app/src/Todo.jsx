/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

function Todo(props) {
    // Add a delete button here so user can delete a TODO.
    const {title, completed, description, id} = props;

    return <div key={id} style={{margin: '15px'}}>
        <h1 className="title">{title}</h1>
        <p className="decription">{description}</p>
        <label htmlFor=""> <input type="checkbox" defaultChecked={completed}/></label>
        <button>Delete</button>
    </div>
}

export default Todo;