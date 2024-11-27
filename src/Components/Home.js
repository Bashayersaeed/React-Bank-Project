import React, { useState }from 'react';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { profile, deposit, withdraw } from '../API/auth';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { type } from '@testing-library/user-event/dist/type';


const Home = () => {
  const [balance, setBalance] = useState(0);
  const [error, setError] =useState('');
  const navigate = useNavigate();

  const { data: user, isLoading, isError } = useQuery({
    queryKey: ["Profile"],
    queryFn: profile,
    onError: () => {
      localStorage.removeItem('token');
      navigate ('/login');
    },
  });

  // if (isLoading) return <p>Laoding...</p>
  // if (isError) return null;

  const depositMutation = useMutation ({
    mutationFn: (amount) => deposit(amount),
    onSuccess: (_, variables) => {
      setBalance((prev) => prev + parseFloat(variables));
      setError('');
    },
    
    onError: (err)  => {
      setError(err.response?.data?.message || 'Failed to deposit funds.');
    
    },
  });

  const withdrawMutation = useMutation ({
    mutationFn: (amount) => withdraw(amount),
    onSuccess: (_, variables) => {
      setBalance((prev) => prev + parseFloat(variables));
      setError('');
    },
    
    onError: (err)  => {
      setError(err.response?.data?.message || 'Failed to withdraw funds.');
    
    },
  });

const handleLogout = () => {
  localStorage.removeItem('token')
  navigate('/login')
}

const validate = (values) => {
  const errors = {};
  const amount = parseFloat(values.amount);

  if (!values.amount) {
    errors.amount = 'Amount is reqiured';
  } else if (amount <=0) {
    errors.amount = 'Amount must be greater than 0';
  } else if (values.type === 'withdraw' && amount > balance){
    errors.amount = 'Ínsuffeciant Funds';
  }
  return errors;
};

    return (
    <div style={{padding: '20px'}}>
      <h1>Welcome, {user?.name || 'user'}</h1>
      <h2>Balance: ${balance.toFixed(2)}</h2>

      <Formik
      initialValues={{amount: '', type: 'deposit' }}
      validate={validate} 
      onSubmit={(values, { resetForm, setSubmitting }) => {
        setError('')
        const amount = parseFloat(values.amount);
        if (values.type === 'deposit') {
          depositMutation.mutate(amount, {
            onSuccess: () => {
              resetForm(); 
              setSubmitting(false);
            },
          });
        } else {
          withdrawMutation.mutate(amount, {
            onSuccess: () => {
              resetForm(); 
              setSubmitting(false);
            },
          });
        }
      }}
    >
      {({ isSubmitting, setFieldValue }) => (
        <Form style={{ marginBottom: '20px' }}>
          <div>
            <Field
              type="number"
              name="amount"
              placeholder="Enter amount"
              style={{ padding: '10px', width: '200px' }}
            />
            <ErrorMessage name="amount" component="div" style={{ color: 'red', marginTop: '5px' }} />
          </div>

          <div style={{ marginTop: '10px' }}>
            <button
              type="submit"
              onClick={() => setFieldValue('type', 'deposit')}
              disabled={isSubmitting || depositMutation.isLoading}
              style={{ padding: '10px 20px', marginRight: '10px' }}
            >
              {depositMutation.isLoading ? 'Depositing...' : 'Deposit'}
            </button>
            <button
              type="submit"
              onClick={() => setFieldValue('type', 'withdraw')}
              disabled={isSubmitting || withdrawMutation.isLoading}
              style={{ padding: '10px 20px' }}
            >
              {withdrawMutation.isLoading ? 'Withdrawing...' : 'Withdraw'}
            </button>
          </div>
        </Form>
      )}
    </Formik>

    {error && <p style={{ color: 'red' }}>{error}</p>}

    <button
      onClick={handleLogout}
      style={{ padding: '10px 20px', backgroundColor: 'red', color: 'white' }}
    >
      Logout
    </button>
  </div>
);
};

export default Home;