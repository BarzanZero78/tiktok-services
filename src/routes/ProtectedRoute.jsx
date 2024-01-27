import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const { isLoading, user } = useAuth();

    if(isLoading) return;

    if(user) {
        return <Navigate to='/' />
    }

  return children;
}

export default ProtectedRoute
