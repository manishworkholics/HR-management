// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
    const token = localStorage.getItem("authToken"); 

    if (!token) {
        // If there's no token, redirect to the login page
        return <Navigate to="/hr-management" />;
    }
    return element;
};

export default ProtectedRoute;
