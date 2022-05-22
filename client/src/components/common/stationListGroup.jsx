import React from 'react';
import { useNavigate } from 'react-router-dom';

const StationListGroup = ({ stations, onStation, onStationDelete }) => {
  const navigate = useNavigate();

  return (
    <ul className='list-group'>
      {stations.map((station) => (
        <li
          key={station._id}
          className='list-group-item d-flex justify-content-between'
        >
          <h5
            style={{ cursor: 'pointer' }}
            onClick={() => onStation(station.name)}
          >
            {station.name}
          </h5>
          <p className='lead'>{station.range}</p>

          <button
            onClick={() => onStationDelete(station)}
            className='btn btn-danger btn-sm'
          >
            X
          </button>
          <button
            onClick={() => navigate(`/update/${station._id}`)}
            className='btn btn-secondary btn-sm mx-2'
          >
            #
          </button>
        </li>
      ))}
    </ul>
  );
};

export default StationListGroup;
