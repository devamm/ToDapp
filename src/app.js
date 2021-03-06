import React from 'react';
import Web3 from 'web3';
import {TODO_LIST_ADDRESS, TODO_LIST_ABI} from './config';
import TodoCard from './components/TodoCard';
import Transactions from './components/Transactions';
import Modal from './components/Modal';

class App extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            tasks: [],
            connected: false,
            error: false,
            edit: false,
            showAll: false,
            transactions: [],
            contract: {},
            scroll: false,
            open: false,
            content: ''
        }

        this.connectToBlockChain = this.connectToBlockChain.bind(this);
        this.toggleShowAll = this.toggleShowAll.bind(this);
        this.toggleTodo = this.toggleTodo.bind(this);
        this.toggleEditor = this.toggleEditor.bind(this);
        this.saveChanges = this.saveChanges.bind(this);
        this.keepScrolled = this.keepScrolled.bind(this);
        this.deleteTodo = this.deleteTodo.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.createTodo = this.createTodo.bind(this);
    }

    componentDidMount(){
        this.connectToBlockChain(); 
    }

    async connectToBlockChain(){
        //YEET
        try {
            const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
       
            const contract = new web3.eth.Contract(TODO_LIST_ABI, TODO_LIST_ADDRESS, {
                gasPrice: '20000000000'
            });
          
            const count = await contract.methods.taskCount().call();
        
            for(let i = 1; i<= count; i++){
                const task = await contract.methods.tasks(i).call();
                if(task.deleted == false){
                    this.setState({tasks: [...this.state.tasks, {...task, change: undefined}], connected: true, contract});
                }
            }
            //no errors caught, all todos deleted
            this.setState({connected: true, contract});
            
        } catch(e){
            this.setState({connected: false, error: true})
        }
    }

    toggleShowAll(e){
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

    deleteTodo(e, id){
        e.preventDefault();
        id = Number.parseInt(id);
        try{
            this.state.contract.methods.deleteTask(id).send({from: '0x2e18C8fC1f99513FDaCCA32Fa095b688008C2433'}).once(
                'receipt', (receipt) => {
                    let transactions = this.state.transactions;
                    transactions.push(`deleted Todo ${id} with transaction hash: ${receipt.transactionHash}`);

                    this.setState({transactions, tasks: this.state.tasks.filter(task => task.id != id)})
                    this.keepScrolled();
                }
            )
        } catch(e){
            console.log(e);
        }
    }

    toggleEditor(e){
        e.preventDefault();
        this.setState({edit: !this.state.edit});
    }

    toggleModal(e){
        e.preventDefault();
        this.setState({open: !this.state.open, content: ''});
    }

    async createTodo(e){
        e.preventDefault();
        try{
       
            this.state.contract.methods.createTask(this.state.content).send({from: '0x2e18C8fC1f99513FDaCCA32Fa095b688008C2433'})
            .once('receipt', async (receipt) => {
                let transactions = this.state.transactions;

                const id = await this.state.contract.methods.taskCount().call();
                const newTodo = await this.state.contract.methods.tasks(id).call();
                
                transactions.push(`created Todo ${id} with transaction hash: ${receipt.transactionHash}`);

                this.setState({transactions, content: '', tasks: [...this.state.tasks, {...newTodo, change: undefined}]});
                this.keepScrolled();
            })
        } catch(e){
            console.log(e);
        }
    }

    saveChanges(e){
        e.preventDefault();

        this.state.tasks.filter(task => task.change != undefined)
        .filter(filtered => filtered.completed != filtered.change).map(final=> Number.parseInt(final.id)).forEach(
            todoId => {
                this.state.contract.methods.toggleCompleted(todoId).send({from: '0x2e18C8fC1f99513FDaCCA32Fa095b688008C2433'})
                .once('receipt', (receipt) => {
                    //do stuff with reciept here
                    let hashes = this.state.transactions;
                    hashes.push(`updated Todo ${todoId} with transaction hash: ${receipt.transactionHash}`);
                    let tasks = this.state.tasks;
                    tasks.map(task => {
                        if(task.id == todoId){
                            task.completed = !task.completed;
                        }
                    })
                    this.setState({tasks, transactions: hashes});
                    this.keepScrolled();
                })
            }
        );
        this.setState({edit: false});
    }

    keepScrolled(){
        const element = document.getElementById("transaction");
        if(!element){
            return;
        }
        element.scrollTop = Number.MAX_SAFE_INTEGER;
        this.setState({scroll: !this.state.scroll});
    }

    handleChange(e){
        this.setState({[e.target.name]: e.target.value});
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
       
        const todos = this.state.tasks.filter(todo => !todo.completed || this.state.showAll )
        
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
                        <div className="outside" style={{display: 'flex', justifyContent: 'space-between'}}>
                            <div className="todo-wrapper" style={{width: '48%'}}>
                                <h2>To Do:</h2>
                              
                                <div className="todo-header" style={{
                                    display: 'flex', alignContent: 'center', justifyContent: 'space-between'}
                                }>
                                    <div style={{display: 'flex', flexDirection: 'row-reverse'}}>
                                        <button className="square_btn default" onClick={this.toggleEditor} disabled={this.state.open} >
                                            {`${this.state.edit? 'Close' : 'Edit'}`}
                                        </button>
                                        {this.state.edit ? (
                                            <button className="square_btn save" onClick={this.saveChanges}>Save Changes</button>
                                        ) : (
                                            <button className="square_btn save" onClick={this.toggleModal}
                                             disabled={this.state.open}>Add Todo</button>
                                        )}
                                    </div>
                                   <div style={{display: 'flex', alignItems: 'center'}}>
                                    <p className="toggle-text">Showing: Incomplete</p>
                                        <div style={{display: 'flex'}}>
                                            <label className="switch" style={{alignSelf: 'center', margin: '0 0.5em'}}>
                                                <input type="checkbox" checked={this.state.showAll} onChange={this.toggleShowAll}/>
                                                <span className="slider-toggle round"></span>
                                            </label>
                                        </div>
                                    <p className="toggle-text">All</p>
                                    </div>
                                </div>
                                <hr/>
                               
                                <div className="todos">
                                    {this.state.open == true ? <Modal toggle={this.toggleModal} 
                                    content={this.state.content} handleChange={this.handleChange} create={this.createTodo} /> : ''}
                                    {todos.map(todo => 
                                        (<TodoCard todo={todo} key={`todo${todo.id}`} toggle={this.toggleTodo}
                                         edit={this.state.edit} deleteTodo={this.deleteTodo} />)
                                    )}
                                </div>
                            </div>
                            <div className="transaction-wrapper">
                                <Transactions transactions={this.state.transactions}/>  
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
