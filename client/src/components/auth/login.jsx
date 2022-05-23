import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../common/input';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('test1@gmail.com');
  const [password, setPassword] = useState('123456');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data: jwt } = await axios.post(`/api/user/login`, {
        email,
        password,
      });

      localStorage.setItem('token', jwt);
      window.location.href = '/';
    } catch (e) {
      alert('Something went wrong');
    }
  };

  return (
    <>
      <Link to='/'>Back to Station</Link>
      <form onSubmit={handleLogin} className='mt-4'>
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
          Login
        </button>
      </form>
      <Link to='/register'>Not logged In ? Register Now</Link>
    </>
  );
};

export default Login;
