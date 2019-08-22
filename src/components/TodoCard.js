import React from 'react';

const TodoCard = (props) => {
    const {todo, toggle, edit} = props;
  
    return (
        <div className="todo-card" style={{display: 'flex', alignItems: 'center'}}>
            {edit == true? (<div style={{paddingRight: '1em'}}>
                <label class="switch">
                    <input type="checkbox" checked={todo.completed} onChange={(e) => toggle(e, todo.id)}/>
                    <span class="slider round"></span>
                </label>
            </div>) : ''}
            <h3 className={`${todo.completed == true? 'completed': ''}`}>{todo.content}</h3>
            
        </div>
    )
}

export default TodoCard;