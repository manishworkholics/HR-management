//Header
import React from 'react';
import Logo from '../assets/images/logo.png';
import { NavLink, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user_id");
    navigate("/hr-management/user");
  };

  const getNavLinkClass = ({ isActive }) =>
    isActive ? "nav-link me-1 active fw-bold text-light" : "nav-link me-1";

  return (
    <div className="header">
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <NavLink className="navbar-brand text-danger" to="/hr-management/user/dashboard">
            <img src={Logo} alt="Logo" className="logo" />
          </NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 bg-white rounded-5 p-1 me-1">
              <li className="nav-item">
                <NavLink className={getNavLinkClass} to="/hr-management/user/dashboard">Dashboard</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={getNavLinkClass} to="/hr-management/user/attendance">Attendance</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={getNavLinkClass} to="/hr-management/user/leave">Leave</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={getNavLinkClass} to="/hr-management/user/salary">Salary</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={getNavLinkClass} to="/hr-management/user/leave-status">Leave Status</NavLink>
              </li>
            </ul>
            <ul className="navbar-nav  mb-2 mb-lg-0">
              <li className="nav-item me-1">
                <NavLink className={getNavLinkClass} to="#"><i className="fa-solid fa-gear me-2"></i>Setting</NavLink>
              </li>
              <li className="nav-item me-1">
                <NavLink className={getNavLinkClass} to="#"><i className="fa-solid fa-bell"></i></NavLink>
              </li>
              <li className="nav-item dropdown">
                <NavLink className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <i className="fa-solid fa-user"></i>
                </NavLink>
                <ul className="dropdown-menu dropdown-menu-start">
                  <li><NavLink className="dropdown-item bg-light text-dark" to="/hr-management/user/profile">Profile</NavLink></li>
                  <li><NavLink className="dropdown-item bg-light text-dark" to="#">Another action</NavLink></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><button className="dropdown-item  text-dark" onClick={handleLogout}>Logout</button></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;