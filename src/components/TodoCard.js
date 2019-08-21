import React from 'react';

const TodoCard = (props) => {
    const todo = props.todo;
    return (
        <div className="todo-card" style={{border: '1px solid black'}}>
            <h3>{todo.content}</h3>
            <h3>{todo.completed == true ? 'Completed' : 'Incomplete'}</h3>
        </div>
    )
}

export default TodoCard;