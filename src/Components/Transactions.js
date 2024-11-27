
import React, { useState, useEffect} from 'react';
import axios from 'axios';

const Transactions= () => {
  const [transactions, setTransactions] = useState ([]);
  const [loading, setLaoding] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error("User is not logged in");
        }
        const response = await axios.get('/mini-project/api/transactions/my', 
          { headers:{ Authorization: `Bearer ${token}`},
        });

      setTransactions(response.data);
      }  catch (err) {
        setError(err.message);
      } finally {
        setLaoding(false);
      }
    };
    fetchTransactions (); 
  }, []);
  if (loading) return<p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

const getStyles = (type) => {
  switch (type) {
    case 'deposit':
      return { color: 'green', icon: '$'};
    case 'withdraw':
      return { color: 'red', icon: '-'};
    case 'transfer':
      return { color: 'red', icon: '<>'};
    default:
      return { color: 'black', icon: '?'};

  }
};


  return (
    <div>
      <h1>My Transactions</h1>
      <ul>
        {transactions.map((transaction) => {
          const { id, type, amount} = transaction;
          const { color, icon} = getStyles(type);

          return (
            <li key={id}>
              <span>{icon}</span>
              <span>{type.toUpperCase()}: ${amount}</span>
            </li>
          );

        })}
      </ul>
    </div>
   
  )
}

export default Transactions;