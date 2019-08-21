import React from 'react';
import Web3 from 'web3';

class App extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            account: ""
        }

        this.connectToBlockChain = this.connectToBlockChain.bind(this);
    }

    componentDidMount(){
       this.connectToBlockChain();
    }

    async connectToBlockChain(){
        //YEET
        const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
        const account = await web3.eth.getAccounts();
        this.setState({account: account[0]});
    }
    
    render(){
       // console.log(this.state.account)
        return (
            <div>
                <h1>Hello!</h1>
                <h3>Your Account: {this.state.account} </h3>
            </div>
        )
    }
}

export default App;
