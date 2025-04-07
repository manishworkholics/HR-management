import React from 'react';
import { useState, useEffect } from "react";
import Header from '../Components/Header'
import ProfileImg from '../assets/images/pro-img.png'

const Employee = () => {
<<<<<<< HEAD
  
=======
    const [employees, setEmployees] = useState([]);
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
            const response = await fetch("http://206.189.130.102:5050/api/users", {
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
            const response = await fetch(`http://206.189.130.102:5050/api/users/${selectedEmployee._id}`, {
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
            const response = await fetch(`http://206.189.130.102:5050/api/users/${id}`, {
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
            const response = await fetch("http://206.189.130.102:5050/api/users", {
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

>>>>>>> f7684707ae5a847a992330645223c022f88aea37
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
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table table-hover mb-0 rounded-4 overflow-hidden">
                                            <thead>
                                                <tr className="table-warning">
                                                    <th scope="col">#</th>
                                                    <th scope="col">Date</th>
                                                    <th scope="col">Entry Time</th>
                                                    <th scope="col">Exit Time</th>
                                                    <th scope="col">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th scope="row">1</th>
                                                    <td>20/03/25</td>
                                                    <td>10:30 AM</td>
                                                    <td>7:15 PM</td>
                                                    <td>Present</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">2</th>
                                                    <td>21/03/25</td>
                                                    <td>10:30 AM</td>
                                                    <td>7:15 PM</td>
                                                    <td>Present</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">3</th>
                                                    <td>22/03/25</td>
                                                    <td>10:30 AM</td>
                                                    <td>7:15 PM</td>
                                                    <td>Present</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">4</th>
                                                    <td>23/03/25</td>
                                                    <td>10:30 AM</td>
                                                    <td>7:15 PM</td>
                                                    <td>Present</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">5</th>
                                                    <td>24/03/25</td>
                                                    <td>10:30 AM</td>
                                                    <td>7:15 PM</td>
                                                    <td>Present</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">5</th>
                                                    <td>24/03/25</td>
                                                    <td>10:30 AM</td>
                                                    <td>7:15 PM</td>
                                                    <td>Present</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">5</th>
                                                    <td>24/03/25</td>
                                                    <td>10:30 AM</td>
                                                    <td>7:15 PM</td>
                                                    <td>Present</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">5</th>
                                                    <td>24/03/25</td>
                                                    <td>10:30 AM</td>
                                                    <td>7:15 PM</td>
                                                    <td>Present</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">5</th>
                                                    <td>24/03/25</td>
                                                    <td>10:30 AM</td>
                                                    <td>7:15 PM</td>
                                                    <td>Present</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">5</th>
                                                    <td>24/03/25</td>
                                                    <td>10:30 AM</td>
                                                    <td>7:15 PM</td>
                                                    <td>Present</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">5</th>
                                                    <td>24/03/25</td>
                                                    <td>10:30 AM</td>
                                                    <td>7:15 PM</td>
                                                    <td>Present</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">5</th>
                                                    <td>24/03/25</td>
                                                    <td>10:30 AM</td>
                                                    <td>7:15 PM</td>
                                                    <td>Present</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">5</th>
                                                    <td>24/03/25</td>
                                                    <td>10:30 AM</td>
                                                    <td>7:15 PM</td>
                                                    <td>Present</td>
                                                </tr>
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

export default Employee