import React from 'react';
import { useState, useEffect } from "react";
import Header from '../Components/Header'
import ProfileImg from '../assets/images/pro-img.png'

const Attendance = () => {
    const [employees, setEmployees] = useState([]);
    const [currentDate, setCurrentDate] = useState(new Date().toISOString().split("T")[0]);

    // Get Employees
    const getEmployees = async () => {
        try {
            const response = await fetch("http://localhost:4000/api/users", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`)
            const result = await response.json();
            setEmployees(result);
        } catch (error) {
            console.error("Error fetching employees:", error.message);
        }
    };

    useEffect(() => {
        getEmployees();
    }, []);

    return (
        <>
            <div className="container-fluid attendance-page">
                <Header />
                <div className="px-lg-5 px-0">
                    <div className="row">
                        <div className="col-12 px-4">
                            <h1 className="my-4">Attendance</h1>
                        </div>
                        <div className="col-md-12 mb-4">
                            <div className="card bg-ffffff94 border-0 rounded-5 h-100">
                                <div className="card-header pt-3 d-flex justify-content-between bg-transparent border-bottom-0">
                                    <h4 className="mb-0 fw-bold ">Attendance List</h4>
                                    <div className="">
                                        <input type="date" value={currentDate} onChange={(e) => setCurrentDate(e.target.value)} />
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table table-hover mb-0 rounded-4 overflow-hidden">
                                            <thead>
                                                <tr className="table-warning">
                                                    <th scope="col">#</th>
                                                    <th scope="col">Name</th>
                                                    <th scope="col">User Name</th>
                                                    <th scope="col">Job Title</th>
                                                    <th scope="col">Attendance</th>
                                                    <th scope="col">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {employees.length > 0 ? (
                                                    employees.map((employee, index) => (
                                                        <tr key={employee.id}>
                                                            <th scope="row">{index + 1}</th>
                                                            <td>
                                                                <img src={ProfileImg} alt="" className="tbl-empImg" />
                                                                {employee.name}
                                                            </td>
                                                            <td>{employee.username}</td>
                                                            <td>{employee.role}</td>
                                                            <td>
                                                                <select class="form-select" aria-label="Default select example">
                                                                    <option value="1" selected>Present</option>
                                                                    <option value="2">Absent</option>
                                                                    <option value="3">WFH</option>
                                                                </select>
                                                            </td>
                                                            <td>
                                                                <button type="button" className="btn btn-warning text-white rounded-5 me-3">
                                                                    Edit
                                                                    <span className="ms-2"><i className="fa-solid fa-user-pen"></i></span>
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="9" className="text-center">
                                                            No employees found
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Attendance