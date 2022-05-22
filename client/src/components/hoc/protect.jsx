import React from 'react';
import { Navigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

function ProtectedRoute({ children, redirectTo }) {
  try {
    const jwt = localStorage.getItem('token');
    const user = jwtDecode(jwt);
    if (user) {
      return <Navigate to={redirectTo} />;
    }
  } catch (error) {
    return children;
  }
}

export default ProtectedRoute;
