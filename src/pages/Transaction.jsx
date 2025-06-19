import React from 'react';
 import TransactionForm from "../components/TransactionForm.jsx";
 import TransactionList from "../components/TransactionList.jsx";

const Transaction = ({Transactions, addTransaction, editTransaction, deleteTransaction}) => {
  return (
    <div> Transaction
        <TransactionForm addTransaction={addTransaction} />
        <TransactionList 
        transactions={Transactions} editTransaction={editTransaction} 
        deleteTransaction={deleteTransaction}/>
        
        
    </div>
  );
};

export default Transaction;
