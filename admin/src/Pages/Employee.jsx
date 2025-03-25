import React from 'react';
import { useState, useEffect } from "react";
import Header from '../Components/Header'
import ProfileImg from '../assets/images/pro-img.png'

const Employee = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        username: "",
        password: "",
        name: "",
        role: "",
        wages_per_day: "",
    });

    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);

    // Get Employees
    const getEmployees = async () => {
        try {
            setLoading(true);
            const response = await fetch("http://localhost:4000/api/users", {
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

    // Open Edit Modal
    const handleEdit = (employee) => {
        setSelectedEmployee(employee);
        setFormData(employee);
        setShowEditModal(true);
    };

    // Handle Input Change
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Update Employee
    const handleUpdate = async () => {
        try {
            const response = await fetch(`http://localhost:4000/api/users/${selectedEmployee._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            alert("Employee updated successfully!");
            setShowEditModal(false);
            getEmployees();
        } catch (error) {
            console.error("Error updating employee:", error.message);
        }
    };

    // Delete Employee
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this employee?")) return;

        try {
            const response = await fetch(`http://localhost:4000/api/users/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            alert("Employee deleted successfully!");
            getEmployees(); // Refresh list after deletion
        } catch (error) {
            console.error("Error deleting employee:", error.message);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:4000/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            console.log("User Created:", result);
            alert("User successfully created!");
        } catch (error) {
            console.error("Error:", error.message);
            alert("Failed to create user!");
        }
    };

    return (
        <>
            <div className="container-fluid employee-page">
                <Header />
                <div className="px-lg-5 px-0">
                    <div className="row">
                        <div className="col-12 px-4">
                            <h1 className="my-4">Employee Management</h1>
                        </div>
                        <div className="col-md-12 mb-4">
                            <div className="card bg-ffffff94 border-0 rounded-5 h-100">
                                <div className="card-header pt-3 d-flex justify-content-between bg-transparent border-bottom-0">
                                    <h4 className="mb-0 fw-bold ">Employee List</h4>
                                    <div className="">
                                        <button type="button" className="btn btn-dark rounded-5" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                            <span className="me-2"><i className="fa-solid fa-circle-plus"></i></span>Add Employee
                                        </button>
                                    </div>
                                </div>
                                <div className="card-body">
                                    {loading ? (
                                        <div className="text-center">
                                            <div className="spinner-border text-dark"
                                                role='status'></div>
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
                                                                    <button type="button" className="btn btn-warning text-white rounded-5 me-3" onClick={() => handleEdit(employee)}>
                                                                        Edit
                                                                        <span className="ms-2"><i className="fa-solid fa-user-pen"></i></span>
                                                                    </button>
                                                                    <button type="button" className="btn btn-danger rounded-5" onClick={() => handleDelete(employee._id)}>
                                                                        Delete
                                                                        <span className="ms-2"><i className="fa-solid fa-trash-can"></i></span>
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

            {/* Modal Add-Employee */}
            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Add Employee</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Username:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Password:</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Name:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Role:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="role"
                                        value={formData.role}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Wages Per Day:</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="wages_per_day"
                                        value={formData.wages_per_day}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="d-flex justify-content-center align-items-center">
                                    <button type="submit" className="btn btn-dark rounded-5 w-50">
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Edit-Employee */}
            {showEditModal && (
                <div className="modal show d-block fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label className="form-label">Username</label>
                                        <input type="text" className="form-control" name="username" value={formData.username} onChange={handleInputChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Password</label>
                                        <input type="password" className="form-control" name="password" value={formData.password} onChange={handleInputChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Name</label>
                                        <input type="text" className="form-control" name="name" value={formData.name} onChange={handleInputChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Role</label>
                                        <input type="text" className="form-control" name="role" value={formData.role} onChange={handleInputChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Wages Per Day</label>
                                        <input type="text" className="form-control" name="wages_per_day" value={formData.wages_per_day} onChange={handleInputChange} />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowEditModal(false)}>
                                    Cancel
                                </button>
                                <button type="button" className="btn btn-primary" onClick={handleUpdate}>
                                    Update
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Employee