import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { clearAuth, isAuthenticated } from '../auth';

export default function RequireAuth({ children }) {
  const location = useLocation();

  if (!isAuthenticated()) {
    clearAuth();
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return children;
}
