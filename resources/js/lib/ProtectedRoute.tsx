
import React from 'react';
import { Navigate } from 'react-router-dom';

// Define the type for the component's props
interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    // Check for the authentication token in local storage
    const token = localStorage.getItem('api_token');

    // If the token exists, render the child component (the protected page)
    if (token) {
        return <>{children}</>;
    }

    // If the token does not exist, redirect the user to the /login page
    return <Navigate to="/login" />;
};

export default ProtectedRoute;