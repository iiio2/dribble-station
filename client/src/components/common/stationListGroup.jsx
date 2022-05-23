import React from 'react';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

const StationListGroup = ({ stations, onStation, onStationDelete }) => {
  const navigate = useNavigate();

  const jwt = localStorage.getItem('token');

  const user = jwt ? jwtDecode(jwt) : null;

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

          {user && (
            <>
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
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default StationListGroup;
