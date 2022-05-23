import React from 'react';

const StationResult = ({ stations, onStationChange }) => {
  return (
    <>
      <div className='card' style={{ backgroundColor: '#c7ecee' }}>
        <div className='card-body'>
          <h4 className='text-center'>Putin FM 66,6</h4>
          <ul className='list-group'>
            {stations.slice(0, 2).map((station) => (
              <li
                key={station._id}
                className='list-group-item d-flex justify-content-between'
              >
                <h5>{station.name}</h5>
                <p>{station.range}</p>
              </li>
            ))}
          </ul>
          <h4 className='mt-5'>Currently Playing...</h4>
          <h1 className='text-center'>{onStationChange}</h1>
        </div>
      </div>
    </>
  );
};

export default StationResult;
