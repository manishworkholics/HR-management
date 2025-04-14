import React from 'react';
import Logo from '../assets/images/logo.png';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Header = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        toast.success("Logout successfully");
        setTimeout(() => {
            navigate("/hr-management/admin");
        }, 2000);
    };

    const getNavLinkClass = ({ isActive }) =>
        isActive ? "nav-link me-1 active fw-bold text-light bg-dark rounded-5 px-3" : "nav-link me-1";

    return (
        <>
            <div className="header">
                <nav className="navbar navbar-expand-lg">
                    <div className="container-fluid">
                        <ToastContainer position="top-right" autoClose={3000} />
                        <Link className="navbar-brand text-danger" to="/hr-management/admin">
                            <img src={Logo} alt="" className="logo" />
                        </Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 bg-white rounded-5 p-1 me-1">
                                <li className="nav-item">
                                    <NavLink className={getNavLinkClass} to="/hr-management/admin/dashboard">Dashboard</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className={getNavLinkClass} to="/hr-management/admin/employee">Employee</NavLink>
                                </li>
                                <li className="nav-item dropdown">
                                    <Link className="nav-link dropdown-toggle me-1" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Attendance
                                    </Link>
                                    <ul className="dropdown-menu">
                                        <li><NavLink className="dropdown-item" to="/hr-management/admin/attendance">Take Attendance</NavLink></li>
                                        <li><NavLink className="dropdown-item" to="/hr-management/admin/monthly-attendance">Monthly Attendance</NavLink></li>
                                        <li><NavLink className="dropdown-item" to="/hr-management/admin/edit-attendance">Edit Attendance</NavLink></li>
                                    </ul>
                                </li>
                                <li className="nav-item">
                                    <NavLink className={getNavLinkClass} to="/hr-management/admin/leave-request">Requests</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className={getNavLinkClass} to="#">Hiring</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className={getNavLinkClass} to="/hr-management/admin/salary">Salary</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className={getNavLinkClass} to="#">Calendar</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className={getNavLinkClass} to="/hr-management/admin/archives">Archives</NavLink>
                                </li>
                            </ul>

                            <ul className="navbar-nav navbar-nav-white mb-2 mb-lg-0">
                                <li className="nav-item me-1">
                                    <Link className="nav-link" to="#"><i className="fa-solid fa-gear me-2"></i></Link>
                                </li>
                                <li className="nav-item me-1">
                                    <Link className="nav-link" to="#"><i className="fa-solid fa-bell me-2"></i></Link>
                                </li>
                                <li className="nav-item dropdown">
                                    <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i className="fa-solid fa-user"></i>
                                    </Link>
                                    <ul className="dropdown-menu">
                                        <li><Link className="dropdown-item" to="#">Profile</Link></li>
                                        <li><Link className="dropdown-item" to="#">Another action</Link></li>
                                        <li><hr className="dropdown-divider" /></li>
                                        <li>
                                            <button className="dropdown-item bg-danger text-white" onClick={handleLogout}>
                                                Logout
                                            </button>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    );
};

export default Header;
