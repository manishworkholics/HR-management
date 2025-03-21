import React from 'react'
import Logo from '../assets/images/logo.png'
import { Link, NavLink } from 'react-router-dom'
import { useNavigate } from "react-router-dom";

const Header = () => {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("authToken");

        navigate("/login");
    };

    return (
        <>
            <div className="header">
                <nav className="navbar navbar-expand-lg">
                    <div className="container-fluid">
                        <Link className="navbar-brand text-danger" to="#">
                            <img src={Logo} alt="" className="logo" />
                        </Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 bg-white rounded-5 p-1 me-1">
                                <li className="nav-item">
                                    <Link className="nav-link  me-1" aria-current="page" to="/dashboard">Dashboard</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link  me-1" aria-current="page" to="/employee">Employee</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link  me-1" aria-current="page" to="/attendance">Attendance</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active me-1" aria-current="page" to="/leave-request">Requests</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link me-1" aria-current="page" to="#">Hiring</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link me-1" aria-current="page" to="#">Salary</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" aria-current="page" to="#">Calendar</Link>
                                </li>
                            </ul>
                            <ul className="navbar-nav navbar-nav-white mb-2 mb-lg-0">
                                <li className="nav-item me-1">
                                    <Link className="nav-link" aria-current="page" to="#"><i className="fa-solid fa-gear me-2"></i>Setting</Link>
                                </li>
                                <li className="nav-item me-1">
                                    <Link className="nav-link" aria-current="page" to="#"><i className="fa-solid fa-bell"></i></Link>
                                </li>
                                <li class="nav-item dropdown">
                                    <Link class="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i className="fa-solid fa-user"></i>
                                    </Link>
                                    <ul class="dropdown-menu">
                                        <li><Link class="dropdown-item" to="#">Profile</Link></li>
                                        <li><Link class="dropdown-item" to="#">Another action</Link></li>
                                        <li><hr class="dropdown-divider" /></li>
                                        <li><button class="dropdown-item bg-danger text-white" to="#" onClick={handleLogout}>Logout</button></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    )
}

export default Header