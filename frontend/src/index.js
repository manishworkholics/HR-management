import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './App.css'
// import App from './App';
// import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Pages/Login'
import Dashboard from './Pages/Dashboard';
import Employee from './Pages/Employee';
import ProtectedRoute from './Pages/Common_Method/protectedroute'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
    <Route path='/hr-management/user' element={<Login />} />
      <Route path="/hr-management/user/dashboard" element={<ProtectedRoute element={<Dashboard />}  />} />
      <Route path='/hr-management/user/employee' element={<ProtectedRoute element = {<Employee />}/>} />
    </Routes>
  </BrowserRouter>
);

// reportWebVitals();
