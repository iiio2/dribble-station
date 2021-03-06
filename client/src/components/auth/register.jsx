import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../common/input';

import axios from 'axios';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`/api/user/register`, {
        email,
        password,
      });
      localStorage.setItem('token', response.headers['x-auth-token']);
      alert('User registered! Login with your credentials');
      window.location.href = '/login';
    } catch (e) {
      alert('Something went wrong');
    }

    console.log(email, password);
  };

  return (
    <>
      <Link to='/'>Back to Station</Link>
      <form onSubmit={handleRegister} className='mt-4'>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <Input
            type='email'
            className='form-control'
            placeholder='Enter Email...'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <Input
            type='password'
            className='form-control'
            placeholder='Enter Password...'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type='submit' className='btn btn-primary my-5'>
          Register
        </button>
      </form>
      <Link to='/login'>Already Registered ? Login Here</Link>
    </>
  );
};

export default Register;
