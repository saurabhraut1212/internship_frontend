import React from 'react';

const TransactionsTable = ({ transactions }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Price</th>
          <th>Category</th>
          <th>Title</th>
          <th>Sold</th>
          <th>Date of Sale</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map(transaction => (
          <tr key={transaction.id}>
            <td>{transaction.id}</td>
            <td>{transaction.price}</td>
            <td>{transaction.category}</td>
            <td>{transaction.title}</td>
            <td>{transaction.sold ? 'yes' : 'no'}</td>
            <td>{transaction.dateOfSale}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TransactionsTable;
