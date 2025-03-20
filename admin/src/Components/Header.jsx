import React from 'react'
import Logo from '../assets/images/logo.png'

const Header = () => {
    return (
        <>
            <div className="header">
                <nav class="navbar navbar-expand-lg">
                    <div class="container-fluid">
                        <a class="navbar-brand text-danger" href="#">
                            <img src={Logo} alt="" className="logo" />
                        </a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul class="navbar-nav ms-auto mb-2 mb-lg-0 bg-white rounded-5 p-1 me-1">
                                <li class="nav-item">
                                    <a class="nav-link active me-1" aria-current="page" href="/">Dashboard</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link me-1" aria-current="page" href="/employee">Employee</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link me-1" aria-current="page" href="#">Hiring</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link me-1" aria-current="page" href="#">Salary</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" aria-current="page" href="#">Calendar</a>
                                </li>
                            </ul>
                            <ul className="navbar-nav navbar-nav-white mb-2 mb-lg-0">
                                <li class="nav-item me-1">
                                    <a class="nav-link" aria-current="page" href="#"><i class="fa-solid fa-gear me-2"></i>Setting</a>
                                </li>
                                <li class="nav-item me-1">
                                    <a class="nav-link" aria-current="page" href="#"><i class="fa-solid fa-bell"></i></a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" aria-current="page" href="#"><i class="fa-solid fa-user"></i></a>
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