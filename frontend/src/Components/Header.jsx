//Header
import React from 'react';
import Logo from '../assets/images/logo.png';
import { Link, NavLink, useNavigate } from "react-router-dom";

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
          {/* Offcanvas Sidebar for Small Screens */}
          <div class="offcanvas d-lg-none offcanvas-start offcanvasStyle w-75" data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
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
                  <NavLink className={getNavLinkClass} to="/hr-management/user/dashboard"><i class="fa-solid fa-gauge me-2"></i>Dashboard</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={getNavLinkClass} to="/hr-management/user/attendance"> <i class="fa-solid fa-clipboard-user me-2"></i>Attendance</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={getNavLinkClass} to="/hr-management/user/leave"><i class="fa-solid fa-calendar-days me-2"></i>Leave</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={getNavLinkClass} to="/hr-management/user/salary"><i class="fa-solid fa-wallet me-2"></i>Salary</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={getNavLinkClass} to="/hr-management/user/leave-status"><i class="fa-solid fa-file-circle-check me-2"></i>Leave Status</NavLink>
                </li>
                <li className="nav-item me-1">
                  <Link className="nav-link" to="#"><i className="fa-solid fa-gear me-2"></i>Settings</Link>
                </li>
                <li className="nav-item me-1">
                  <Link className="nav-link" to="#"><i className="fa-solid fa-bell me-2"></i>Notifications</Link>
                </li>
                <li className="nav-item me-1">
                  <Link className="nav-link" to="/hr-management/user/profile"><i class="fa-solid fa-user me-2"></i>Profile</Link>
                </li>
                <li className="nav-item me-1 mt-2 w-50">
                  <button className="dropdown-item  text-secondary ps-3" onClick={handleLogout}>
                    <i class="fa-solid fa-right-from-bracket me-1"></i> Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;