import React from 'react';
import Web3 from 'web3';
import {TODO_LIST_ADDRESS, TODO_LIST_ABI} from './config';
import TodoCard from './components/TodoCard';

class App extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            tasks: [{id: 69, completed: true, content: "done", change: undefined}],
            connected: false,
            error: false,
            edit: false,
            showAll: false,
        }

        this.connectToBlockChain = this.connectToBlockChain.bind(this);
        this.toggleShowAll = this.toggleShowAll.bind(this);
        this.toggleTodo = this.toggleTodo.bind(this);
        this.toggleEditor = this.toggleEditor.bind(this);
        this.saveChanges = this.saveChanges.bind(this);
    }

    componentDidMount(){
        this.connectToBlockChain(); 
    }

    async connectToBlockChain(){
        //YEET
        try {
            const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
       
            const todoContract = new web3.eth.Contract(TODO_LIST_ABI, TODO_LIST_ADDRESS, {
                gasPrice: '20000000000'
            });
          
            const count = await todoContract.methods.taskCount().call();
            for(let i = 1; i<= count; i++){
                const task = await todoContract.methods.tasks(i).call();
                this.setState({tasks: [...this.state.tasks, {...task, change: undefined}], connected: true});
            }
        } catch(e){
            this.setState({connected: false, error: true})
        }
       
    }

    toggleShowAll(e){
        e.preventDefault();
        this.setState({showAll: !this.state.showAll});
    }

    toggleTodo(event, id){
      
        let tasks = this.state.tasks;
        tasks.map(task => {
            if(task.id == id){
                //const oldStatus = task.completed;
                //task.completed = event.target.checked;
                task.change = event.target.checked;
            }
        });
        this.setState({tasks});
    }

    toggleEditor(e){
        e.preventDefault();
        this.setState({edit: !this.state.edit});
    }

    saveChanges(e){
        e.preventDefault();
        console.log('tasks to edit:')
        console.log(this.state.tasks.filter(task => task.change != undefined)
        .filter(filtered => filtered.completed != filtered.change).map(final=> Number.parseInt(final.id)));
    }
    
    render(){
        let helloMsg;
        const date = Number.parseInt(new Date().toString().substring(16,18));
        if(date >= 5 && date < 12){
            helloMsg = 'Good Morning!';
        } else if(date >=12 && date <= 16){
            helloMsg = 'Good Afternoon!';
        } else if(date >=17 && date <=23){
            helloMsg = "Good Evening!";
        } else {
            helloMsg = "Hello!"
        }
       
        const todos = this.state.tasks.filter(todo => !todo.completed|| this.state.showAll )
        console.log(todos)
        return (
            <div className="container">
                <br/>
                <h1>{helloMsg}</h1>
                    {this.state.connected == true ?  
                        (<div style={{display: 'flex'}}>
                            <h4>Connected to Contract:</h4>
                            <h4 className="hash" style={{paddingLeft: '1em'}}>{TODO_LIST_ADDRESS} </h4>
                        </div>) 
                    : (<div style={{display: 'flex'}}>
                        <h4>Connecting to Blockchain</h4>
                        <img src="static/loading.gif" style={{
                            alignSelf: 'flex-end', height: '0.4em', paddingLeft: '0.1em', marginBottom: '0.7rem'}}/>
                        </div>)}
                <br/>
                {this.state.connected == true ? (
                    (
                        <div>
                            <h2>To Do:</h2>
                           
                            <div className="todo-header" style={{display: 'flex', alignContent: 'center'}}>
                                <button className="square_btn default" onClick={this.toggleEditor}>{`${this.state.edit? 'Close' : 'Edit'}`}</button>
                                {this.state.edit ? (<button className="square_btn save" onClick={this.saveChanges}>Save Changes</button>) : ''}
                                <button className="square_btn default" onClick={this.toggleShowAll} disabled={this.state.edit}>Show {
                                    this.state.showAll ? 'Incomplete' : "All"}</button>
                            </div>
                            <hr/>
                            <div className="todos">
                                {todos.map(todo => 
                                    (<TodoCard todo={todo} key={`todo${todo.id}`} toggle={this.toggleTodo} edit={this.state.edit} />)
                                )}
                            </div>
                        </div>
                    )
                ) : this.state.error == true ? (
                    <div style={{backgroundColor: '#ededed'}}>
                        <h2 className="hash">Error: Could not connect to smart contract</h2>
                    </div>
                ) : '' }
               
            </div>
        )
    }
}

export default App;
