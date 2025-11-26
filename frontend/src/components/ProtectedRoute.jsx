
import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ requireAdmin }) => {
    const { user, isAuthenticated } = useContext(AuthContext);


    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

   
    if (requireAdmin && (!user.roles || !user.roles.includes('admin'))) {
        return <Navigate to="/" replace />;
    }


    return <Outlet />;
};

export default ProtectedRoute;