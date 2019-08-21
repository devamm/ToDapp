import React from 'react';

const TodoCard = (props) => {
    const todo = props.todo;
    return (
        <div className="todo-card" style={{display: 'flex', alignItems: 'center'}}>
            <div style={{paddingRight: '1em'}}>
                <label class="switch">
                    <input type="checkbox"/>
                    <span class="slider round"></span>
                </label>
            </div>
            <h3 className={todo.completed == true ? 'completed' : '' }>{todo.content}</h3>
            
        </div>
    )
}

export default TodoCard;