import React from 'react';

const Transactions = (props) => {
    const {transactions} = props;

    return (
        <div className="transactions" style={{width: '48%', height: '100%'}}>
            <h2>Transactions:</h2>
            <div className="todos transactions-view">
                <div>
                    {transactions.map(trans => (<p className="hash">{trans}</p>))}
                </div>
            </div>
        </div>
    )
}

export default Transactions;