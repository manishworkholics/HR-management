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
            <ToastContainer position="top-right" autoClose={3000} />
            <div className="header">
                <nav className="navbar navbar-expand-lg">
                    <div className="container-fluid">
                        <Link className="navbar-brand text-danger me-auto" to="/hr-management/admin">
                            <img src={Logo} alt="" className="logo" />
                        </Link>
                        {/* Hamburger Button for Small Screens */}
                        <button
                            className="btn d-lg-none me-2"
                            type="button"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#offcanvasWithBothOptions"
                            aria-controls="offcanvasWithBothOptions"
                        >
                            <i className="fa-solid fa-bars fs-4"></i>
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
                                {/* <li className="nav-item">
                                    <NavLink className={getNavLinkClass} to="#">Hiring</NavLink>
                                </li> */}
                                <li className="nav-item">
                                    <NavLink className={getNavLinkClass} to="/hr-management/admin/salary">Salary</NavLink>
                                </li>
                                {/* <li className="nav-item">
                                    <NavLink className={getNavLinkClass} to="#">Calendar</NavLink>
                                </li> */}
                                <li className="nav-item">
                                    <NavLink className={getNavLinkClass} to="/hr-management/admin/archives">Archives</NavLink>
                                </li>
                            </ul>

                            <ul className="navbar-nav navbar-nav-white mb-2 mb-lg-0">
                                <li className="nav-item me-1">
                                    <Link className="nav-link" to="#"><i className="fa-solid fa-gear "></i></Link>
                                </li>
                                <li className="nav-item me-1">
                                    <Link className="nav-link" to="#"><i className="fa-solid fa-bell"></i></Link>
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
            {/* Offcanvas Sidebar for Small Screens */}
            <div class="offcanvas offcanvas-start w-75" data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
                <div class="offcanvas-header">
                    <h5 class="offcanvas-title" id="offcanvasWithBothOptionsLabel"> <div className="container-fluid">
                        <Link className="navbar-brand text-danger me-auto" to="/hr-management/admin">
                            <img src={Logo} alt="" className="logo" />
                        </Link></div></h5>
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 bg-white rounded-5 p-1 me-1">
                        <li className="nav-item">
                            <NavLink className={getNavLinkClass} to="/hr-management/admin/dashboard"><i class="fa-solid fa-gauge me-2"></i>Dashboard</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className={getNavLinkClass} to="/hr-management/admin/employee"><i class="fa-solid fa-users me-2"></i>Employee</NavLink>
                        </li>
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle me-1" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="fa-solid fa-clipboard-user me-2"></i>Attendance
                            </Link>
                            <ul className="dropdown-menu">
                                <li><NavLink className="dropdown-item" to="/hr-management/admin/attendance">Take Attendance</NavLink></li>
                                <li><NavLink className="dropdown-item" to="/hr-management/admin/monthly-attendance">Monthly Attendance</NavLink></li>
                                <li><NavLink className="dropdown-item" to="/hr-management/admin/edit-attendance">Edit Attendance</NavLink></li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <NavLink className={getNavLinkClass} to="/hr-management/admin/leave-request"><i class="fa-solid fa-hand me-2"></i>Requests</NavLink>
                        </li>
                        {/* <li className="nav-item">
                                    <NavLink className={getNavLinkClass} to="#">Hiring</NavLink>
                                </li> */}
                        <li className="nav-item">
                            <NavLink className={getNavLinkClass} to="/hr-management/admin/salary"><i class="fa-solid fa-wallet me-2"></i>Salary</NavLink>
                        </li>
                        {/* <li className="nav-item">
                                    <NavLink className={getNavLinkClass} to="#">Calendar</NavLink>
                                </li> */}
                        <li className="nav-item">
                            <NavLink className={getNavLinkClass} to="/hr-management/admin/archives"><i class="fa-solid fa-box-archive me-2"></i>Archives</NavLink>
                        </li>
                        <li className="nav-item me-1">
                            <Link className="nav-link" to="#"><i className="fa-solid fa-gear me-2"></i>Settings</Link>
                        </li>
                        <li className="nav-item me-1">
                            <Link className="nav-link" to="#"><i className="fa-solid fa-bell me-2"></i>Notifications</Link>
                        </li>
                        <li className="nav-item me-1 mt-2 w-25">
                            <button className="dropdown-item  text-dark text-center" onClick={handleLogout}>
                                <i class="fa-solid fa-right-from-bracket me-1"></i> Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Header;