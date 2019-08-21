import React from 'react';
import Web3 from 'web3';
import {TODO_LIST_ADDRESS, TODO_LIST_ABI} from './config';
class App extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            tasks: []
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
        console.log(count);
       
        for(let i = 1; i<= count; i++){
            const task = await todoContract.methods.tasks(i).call();
            this.setState({tasks: [...this.state.tasks, task]});
        }
    }
    
    render(){
       console.log(this.state.tasks)
        return (
            <div>
                <h1>Hello!</h1>
                <h3>Connected to Contract: {TODO_LIST_ADDRESS} </h3>
            </div>
        )
    }
}

export default App;
