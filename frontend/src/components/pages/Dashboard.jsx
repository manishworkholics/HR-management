import React, { useEffect, useState } from "react";


const Dashboard = () => {
    const [employees, setEmployees] = useState([]); // State to store employees

    // Fetch Employees
    const fetchEmployees = async () => {
        try {
            const response = await fetch("http://localhost:4000/api/users", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            const result = await response.json();
            setEmployees(result);
        } catch (error) {
            console.error("Error fetching employees:", error.message);
        }
    };

    useEffect(() => {
        fetchEmployees(); // Fetch employees on load
    }, []);
    return (
        <div>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-12'>
                        <h1 className='my-5 mb-5'>Employee List</h1>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>S.no</th>
                                    <th>Username</th>
                                    <th>Name</th>
                                    <th>Role</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employees.length > 0 ? (
                                    employees.map((employee, index) => (
                                        <tr key={employee.id}>
                                            <th>{index + 1}</th>
                                            <td>{employee.username}</td>
                                            <td>{employee.name}</td>
                                            <td>{employee.role}</td>


                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center">
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
    )
}

export default Dashboard