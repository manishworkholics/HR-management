import React from 'react';
import { useState, useEffect } from "react";
import Header from '../Components/Header'
import ProfileImg from '../assets/images/pro-img.png'

const Archives = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(false);

    // Get Employees
    const getEmployees = async () => {
        try {
            setLoading(true);
            const response = await fetch("http://localhost:4000/api/users/archives", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`)
            const result = await response.json();
            setEmployees(result);
        } catch (error) {
            console.error("Error fetching employees:", error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getEmployees();
    }, []);

    // Delete Employee
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to undo this employee?")) return;

        try {
            const response = await fetch(`http://localhost:4000/api/users/undo-user/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            alert("Employee undo successfully!");
            getEmployees(); // Refresh list after deletion
        } catch (error) {
            console.error("Error deleting employee:", error.message);
        }
    };



    return (
        <div>
            <div className="container-fluid employee-page">
                <Header />
                <div className="px-lg-5 px-0">
                    <div className="row">
                        <div className="col-12 px-4">
                            <h1 className="my-4">Previous Employees List</h1>
                        </div>
                        <div className="col-md-12 mb-4">
                            <div className="card bg-ffffff94 border-0 rounded-5 h-100">
                                <div className="card-header pt-3 d-flex justify-content-between bg-transparent border-bottom-0">
                                    <h4 className="mb-0 fw-bold ">Employee List</h4>
                                    <div className="">
                                        {/* <button type="button" className="btn btn-dark rounded-5" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                            <span className="me-2"><i className="fa-solid fa-circle-plus"></i></span>Add Employee
                                        </button> */}
                                    </div>
                                </div>
                                <div className="card-body">
                                    {loading ? (
                                        <div className="text-center">
                                            <div
                                                className="spinner-border text-dark"
                                                role="status"
                                            ></div>
                                            <p>Loading data...</p>
                                        </div>
                                    ) : (
                                        <div className="table-responsive">
                                            <table className="table table-hover mb-0 rounded-4 overflow-hidden">
                                                <thead>
                                                    <tr className="table-warning">
                                                        <th scope="col">#</th>
                                                        <th scope="col">Name</th>
                                                        <th scope="col">User Name</th>
                                                        <th scope="col">Job Title</th>
                                                        <th scope="col">Department</th>
                                                        <th scope="col">Site</th>
                                                        <th scope="col">Salary</th>
                                                        <th scope="col">Start Date</th>
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
                                                                <td>NA</td>
                                                                <td>NA</td>
                                                                <td className=''>{employee.wages_per_day}</td>
                                                                <td>NA</td>
                                                                <td>
                                                                    {/* <button type="button" className="btn btn-warning text-white rounded-5 me-3" onClick={() => handleEdit(employee)}>
                                                                    Edit
                                                                    <span className="ms-2"><i className="fa-solid fa-user-pen"></i></span>
                                                                </button> */}
                                                                    <button type="button" className="btn btn-danger rounded-5" onClick={() => handleDelete(employee._id)}>
                                                                        Undo

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
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>







        </div>


    )
}

export default Archives