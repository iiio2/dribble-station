import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/home';
import AddStation from './components/addStation';
import UpdateStation from './components/update';
import Register from './components/auth/register';
import Login from './components/auth/login';
import jwtDecode from 'jwt-decode';
import RequireAuth from './components/hoc/auth';
import ProtectedRoute from './components/hoc/protect';

const App = () => {
  return (
    <div className='container'>
      <Routes>
        <Route exact path='/update/:id' element={<UpdateStation />} />
        <Route
          exact
          path='/add'
          element={
            <RequireAuth redirectTo='/login'>
              <AddStation />
            </RequireAuth>
          }
        />
        <Route exact path='/register' element={<Register />} />
        <Route
          exact
          path='/login'
          element={
            <ProtectedRoute redirectTo='/'>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route exact path='/' element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
