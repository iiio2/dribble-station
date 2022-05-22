import React, { useState } from 'react';
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
      alert('User registered');
    } catch (e) {
      alert('Something went wrong');
    }

    console.log(email, password);
  };

  return (
    <>
      <form onSubmit={handleRegister}>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            className='form-control'
            placeholder='Enter Email...'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
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
    </>
  );
};

export default Register;
