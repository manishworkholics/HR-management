import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './App.css'
// import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './Pages/Dashboard';
import Employee from './Pages/Employee';
import Attendance from './Pages/Attendance';
import LeaveRequest from './Pages/LeaveRequest';
import Login from './Pages/Login';
import MonthlyAttendance from './Pages/MonthlyAttendance';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/employee' element={<Employee />} />
      <Route path='/attendance' element={<Attendance />} />
      <Route path='/monthly-attendance' element={<MonthlyAttendance />} />
      <Route path='/leave-request' element={<LeaveRequest />} />
    </Routes>
  </BrowserRouter>
);

reportWebVitals();
