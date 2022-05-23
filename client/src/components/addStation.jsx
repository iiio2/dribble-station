import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
          <input
            type='text'
            className='form-control'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label htmlFor='name'>Range</label>
          <input
            type='text'
            className='form-control'
            value={range}
            onChange={(e) => setRange(e.target.value)}
          />
        </div>
        <button type='submit' className='btn btn-info my-5'>
          Submit
        </button>
      </form>
    </>
  );
};

export default AddStation;
