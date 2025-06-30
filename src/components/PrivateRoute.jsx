import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './Provider/Authproviders';
// import { AuthContext } from '../Provider/Authproviders';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
      </div>
    );
  }
  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;