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
import ProtectedRoute from './Pages/Common_Method/protectedroute'
import MonthlyAttendance from './Pages/MonthlyAttendance';
import Salary from './Pages/Salary';
import Archives from './Pages/Archives';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/hr-management/admin' element={<Login />} />
      <Route path="/hr-management/admin/dashboard" element={<ProtectedRoute element={<Dashboard />}  />} />
      <Route path='/hr-management/admin/employee' element={<ProtectedRoute element = {<Employee />}/>} />
      <Route path='/hr-management/admin/archives' element={<ProtectedRoute element = {<Archives />}/>} />
      <Route path='/hr-management/admin/attendance' element={<ProtectedRoute element = {<Attendance/>} />} />
      <Route path='/hr-management/admin/leave-request' element={<ProtectedRoute element = {<LeaveRequest/>}/>} />
      <Route path='/hr-management/admin/employee' element={<ProtectedRoute element = {<Employee/>} />} />
      <Route path='/hr-management/admin/attendance' element={<ProtectedRoute element = {<Attendance />} />} />
      <Route path='/hr-management/admin/monthly-attendance' element={<ProtectedRoute element = {<MonthlyAttendance />} />} />
      <Route path='/hr-management/admin/leave-request' element={<ProtectedRoute element = {<LeaveRequest />} />} />
      <Route path='/hr-management/admin/salary' element={<ProtectedRoute element = {<Salary />} />} />
    </Routes>
  </BrowserRouter>
);

reportWebVitals();
