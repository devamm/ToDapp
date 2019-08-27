import React from 'react';

const Transactions = (props) => {
    const {transactions} = props;

    return (
        <div className="transactions" style={{width: '48%', height: '100%'}}>
            <h2>Transactions:</h2>
            <div className="todos transactions-view" id="transaction">
                {transactions.map(trans => (
                    <div>
                        <small className="hash">{trans}</small>
                        <br/>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Transactions;