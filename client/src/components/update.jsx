import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Input from './common/input';
import axios from 'axios';

const UpdateStation = () => {
  const [name, setName] = useState('');
  const [range, setRange] = useState('');

  const { id } = useParams();
  const navigate = useNavigate();

  const getPost = async () => {
    const { data: station } = await axios.get(`/api/station/${id}`);
    setName(station.name);
    setRange(station.range);
  };

  useEffect(() => {
    getPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`/api/update`, { id, name, range });
    navigate('/');
  };

  return (
    <>
      <h3>Update Station</h3>
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
          Update
        </button>
      </form>
    </>
  );
};

export default UpdateStation;
