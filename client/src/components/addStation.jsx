import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from './common/input';
import axios from 'axios';

const AddStation = () => {
  const [name, setName] = useState('');
  const [range, setRange] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`/api/add`, { name, range });
    navigate('/');
  };

  return (
    <>
      <h3>Add Station</h3>

      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <Input
            type='text'
            className='form-control'
            placeholder='Type name...'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label htmlFor='name'>Range</label>
          <Input
            type='text'
            className='form-control'
            placeholder='Type range...'
            value={range}
            onChange={(e) => setRange(e.target.value)}
          />
        </div>
        <button
          disabled={name.trim().length === 0 || range.trim().length === 0}
          type='submit'
          className='btn btn-info my-5'
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default AddStation;
