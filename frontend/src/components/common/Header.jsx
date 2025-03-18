import React from 'react'
import { Link } from "react-router-dom"


const Header = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-sm bg-light navbar-light">
                <div className="container-fluid">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link active" to="/dashboard">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/dashboard/employee' >Employee</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/dashboard/employee">Link</Link>
                        </li>
                      
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Header