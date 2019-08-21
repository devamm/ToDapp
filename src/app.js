import React from 'react';
import Web3 from 'web3';
import {TODO_LIST_ADDRESS, TODO_LIST_ABI} from './config';
import TodoCard from './components/TodoCard';

class App extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            tasks: [{id: 69, completed: true, content: "done"}]
        }

        this.connectToBlockChain = this.connectToBlockChain.bind(this);
    }

    componentDidMount(){
       this.connectToBlockChain();
    }

    async connectToBlockChain(){
        //YEET
        const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
       
        const todoContract = new web3.eth.Contract(TODO_LIST_ABI, TODO_LIST_ADDRESS, {
            gasPrice: '20000000000'
        });
      
        const count = await todoContract.methods.taskCount().call();
        for(let i = 1; i<= count; i++){
            const task = await todoContract.methods.tasks(i).call();
            this.setState({tasks: [...this.state.tasks, task]});
        }
    }
    
    render(){
       console.log(this.state.tasks)
        return (
            <div className="container">
                <h1>Hello!</h1>
                <div style={{display: 'flex'}}>
                    <h4>Connected to Contract:</h4>
                    <h4 className="hash" style={{paddingLeft: '1em'}}>{TODO_LIST_ADDRESS} </h4>
                </div>
              
                <br/>
                <h2>To Do:</h2>
                <div className="todos" style={{border: '1px solid red'}}>
                    {this.state.tasks.map(todo => (<TodoCard todo={todo} key={`todo${todo.id}`} />))}
                </div>
            </div>
        )
    }
}

export default App;
