import React from 'react';

const TodoCard = (props) => {
    const {todo, toggle, edit, deleteTodo} = props;
    let completed;
    if(todo.change == undefined){
        completed = todo.completed;
    } else {
        completed = todo.change;
    }
  
    return (
        <div className="todo-card" style={{display: 'flex', alignItems: 'center'}}>
            {edit == true? (<div style={{paddingRight: '1em'}}>
                <label class="switch">
                    <input type="checkbox" checked={completed} onChange={(e) => toggle(e, todo.id)}/>
                    <span class="slider round"></span>
                </label>
            </div>) : ''}
            <h3 className={`${todo.completed == true? 'completed': ''}`}>{todo.content}</h3>
            {edit == true? (
            <img src="static/trash.png" className="trash" style={
                {height: '1.3em', margin: '0 0.5em 0.5em auto', alignSelf: 'center'}} onClick={(e) => deleteTodo(e, todo.id)} />
            ) : ''}
        </div>
    )
}

export default TodoCard;