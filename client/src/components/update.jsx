import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
          Update
        </button>
      </form>
    </>
  );
};

export default UpdateStation;
