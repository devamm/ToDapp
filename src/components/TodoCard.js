import React from 'react';

const TodoCard = (props) => {
    const todo = props.todo;
    return (
        <div className="todo-card" style={{border: '1px solid black'}}>
            <h3 className={todo.completed == true ? 'completed' : '' }>{todo.content}</h3>
            <h3>{todo.completed == true ? 'Completed' : 'Incomplete'}</h3>
            <label class="switch">
                <input type="checkbox"/>
                <span class="slider round"></span>
            </label>
        </div>
    )
}

export default TodoCard;