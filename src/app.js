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
        this.generateDummyData = this.generateDummyData.bind(this);
        this.toggleTodo = this.toggleTodo.bind(this);
    }

    componentDidMount(){
        this.connectToBlockChain();
        this.generateDummyData();
    }

    generateDummyData(){
        let tmpTasks = []
        for(let i = 10; i <=30; i++){
            console.log('setting state for ',i);
            tmpTasks.push({id: i, content: 'task'+i, completed: false});
        }
        this.setState({tasks: [...this.state.tasks, ...tmpTasks]});
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

    toggleTodo(event, id){
      
        let tasks = this.state.tasks;
        tasks.map(task => {
            if(task.id == id){
                task.completed = !task.completed
            }
        });
        this.setState({tasks});
    }
    
    render(){
      
        return (
            <div className="container">
                <h1>Hello!</h1>
                <div style={{display: 'flex'}}>
                    <h4>Connected to Contract:</h4>
                    <h4 className="hash" style={{paddingLeft: '1em'}}>{TODO_LIST_ADDRESS} </h4>
                </div>
              
                <br/>
                <h2>To Do:</h2>
                <div className="todos">
                    {this.state.tasks.map(todo => (<TodoCard todo={todo} key={`todo${todo.id}`} toggle={this.toggleTodo} />))}
                </div>
            </div>
        )
    }
}

export default App;
