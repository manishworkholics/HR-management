import React from 'react'
import Logo from '../assets/images/logo.png'
import { Link, NavLink } from 'react-router-dom'
// 

const Header = () => {
    return (
        <>
            <div className="header">
                <nav className="navbar navbar-expand-lg">
                    <div className="container-fluid">
                        <NavLink className="navbar-brand text-danger" to="#">
                            <img src={Logo} alt="" className="logo" />
                        </NavLink>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 bg-white rounded-5 p-1 me-1">
                                <li className="nav-item">
                                    <NavLink className="nav-link  me-1" aria-current="page" to="/dashboard">Dashboard</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link  me-1" aria-current="page" to="/employee">Employee</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link  me-1" aria-current="page" to="/attendance">Attendance</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link  me-1" aria-current="page" to="/leave-request">Requests</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link me-1" aria-current="page" to="/">Hiring</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link me-1" aria-current="page" to="/">Salary</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" aria-current="page" to="/">Calendar</NavLink>
                                </li>
                            </ul>
                            <ul className="navbar-nav navbar-nav-white mb-2 mb-lg-0">
                                <li className="nav-item me-1">
                                    <NavLink className="nav-link" aria-current="page" to="#"><i className="fa-solid fa-gear me-2"></i>Setting</NavLink>
                                </li>
                                <li className="nav-item me-1">
                                    <NavLink className="nav-link" aria-current="page" to="#"><i className="fa-solid fa-bell"></i></NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" aria-current="page" to="#"><i className="fa-solid fa-user"></i></NavLink>
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