import React from 'react';

class Modal extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="new-modal">
                <div style={{width: '75%'}}>
                    <input type="text" name="content" value={this.props.content}
                     onChange={this.props.handleChange} placeholder="New To Do"></input>
                </div>
                <div style={{width: '25%', display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
                    <img className="form-img" src="static/check.png" onClick={this.props.create} />
                    <img className="form-img" src="static/close.png" onClick={this.props.toggle}/>
                </div>
            </div>
        )
       
    }
}

export default Modal;