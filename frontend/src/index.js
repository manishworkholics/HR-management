import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import PageNotFound from './components/pages/PageNotFound';
import App from './App';
import './App.css';
import Dashboard from './components/pages/Dashboard';
import Registration from './components/pages/Registration';
import Login from './components/pages/Login';
import Payroll from './components/pages/Payroll';
import Employee from './components/pages/Employee';
import Addemployee from './components/pages/Addemployee';
import Application from './components/pages/Application';


const root = ReactDOM.createRoot(
    document.getElementById("root")
);
root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/dashboard" element={<App />}>
                <Route index path="/dashboard" element={<Dashboard />} />
                <Route index path="/dashboard/register" element={<Registration />} />
                <Route index path="/dashboard/login" element={<Login />} />
                <Route index path="/dashboard/payroll" element={<Payroll />} />
                <Route index path="/dashboard/employee" element={<Employee />} />
                <Route index path="/dashboard/add-employee" element={<Addemployee />} />
                <Route index path="/dashboard/leave-application" element={<Application />} />

                <Route path='*' element={<PageNotFound />} />
            </Route>
        </Routes>
    </BrowserRouter>
);

