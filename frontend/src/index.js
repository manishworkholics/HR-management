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
import Attendance from './Pages/Attendance';
import LeaveRequest from './Pages/LeaveRequest';
import ProtectedRoute from './Pages/Common_Method/protectedroute'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
    <Route path='/login' element={<Login />} />
      <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />}  />} />
      <Route path='/employee' element={<ProtectedRoute element = {<Employee />}/>} />
      <Route path='/attendance' element={<ProtectedRoute element = {<Attendance/>} />} />
      <Route path='/leave-request' element={<ProtectedRoute element = {<LeaveRequest/>}/>} />
    </Routes>
  </BrowserRouter>
);

// reportWebVitals();
