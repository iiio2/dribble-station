import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import StationResult from './stationResult';
import StationListGroup from './common/stationListGroup';
import jwtDecode from 'jwt-decode';

const Home = () => {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stationChange, setStationChange] = useState('Putin FM');

  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const user = token ? jwtDecode(token) : null;

  const getStations = async () => {
    const { data: stations } = await axios.get(`/api/stations`);
    setStations(stations);
    setLoading(false);
  };

  useEffect(() => {
    getStations();
  }, [loading]);

  const handleStation = (station) => {
    setStationChange(station);
  };

  const handleStationDelete = async (station) => {
    if (station.name === stationChange) {
      setStationChange('Station Removed!');
    }
    const filteredStations = stations.filter((s) => s._id !== station._id);
    await axios.post(`/api/delete`, { id: station._id });
    setStations(filteredStations);
  };

  if (loading) return <p className='lead'>Loading...</p>;

  return (
    <main>
      <div className='card-block'>
        <div className='card'>
          <div className='btn-fields'>
            <button
              onClick={() => navigate('/add')}
              className='btn btn-primary btn-sm m-2'
            >
              {user ? 'Add Station' : 'Sign In to Add Station'}
            </button>
          </div>

          <div className='card-body d-flex justify-content-around'>
            <StationListGroup
              stations={stations}
              onStation={handleStation}
              onStationDelete={handleStationDelete}
            />

            <StationResult
              stations={stations}
              onStationChange={stationChange}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
