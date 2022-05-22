import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

function RequireAuth({ children, redirectTo }) {
  try {
    const jwt = localStorage.getItem('token');
    const user = jwtDecode(jwt);
    if (user) {
      return children;
    }
  } catch (error) {
    return <Navigate to={redirectTo} />;
  }
}

export default RequireAuth;
