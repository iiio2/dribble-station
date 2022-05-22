import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data: jwt } = await axios.post(`/api/user/login`, {
        email,
        password,
      });

      localStorage.setItem('token', jwt);

      alert('User logged in');
    } catch (e) {
      alert('Something went wrong');
    }

    console.log(email, password);
  };

  return (
    <>
      <form onSubmit={handleLogin}>
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
          Login
        </button>
      </form>
    </>
  );
};

export default Login;
