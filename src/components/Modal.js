import React from 'react';

class Modal extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="new-modal">
                <div style={{width: '75%'}}>
                    <input type="text" placeholder="New To Do"></input>
                </div>
                <div style={{width: '25%', display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
                    <img className="form-img" src="static/check.png"/>
                    <img className="form-img" src="static/close.png" />
                </div>
            </div>
        )
       
    }
}

export default Modal;