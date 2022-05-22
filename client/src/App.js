import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/home';
import AddStation from './components/addStation';
import UpdateStation from './components/update';

const App = () => {
  return (
    <div className='container'>
      <Routes>
        <Route exact path='/update/:id' element={<UpdateStation />} />
        <Route exact path='/add' element={<AddStation />} />
        <Route exact path='/' element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
