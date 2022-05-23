import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/home';
import AddStation from './components/addStation';
import UpdateStation from './components/update';
import Register from './components/auth/register';
import Login from './components/auth/login';
import RequireAuth from './components/hoc/auth';
import ProtectedRoute from './components/hoc/protect';

const App = () => {
  const user = localStorage.getItem('token');
  const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <div className='container'>
      <h3 className='text-center display-4'>Stations</h3>

      {user ? (
        <button onClick={logout} className='btn btn-light'>
          Logout
        </button>
      ) : null}

      <Routes>
        <Route
          exact
          path='/update/:id'
          element={
            <RequireAuth redirectTo='/login'>
              <UpdateStation />
            </RequireAuth>
          }
        />

        <Route
          exact
          path='/add'
          element={
            <RequireAuth redirectTo='/login?must-login'>
              <AddStation />
            </RequireAuth>
          }
        />
        <Route
          exact
          path='/register'
          element={
            <ProtectedRoute redirectTo='/'>
              <Register />
            </ProtectedRoute>
          }
        />
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
