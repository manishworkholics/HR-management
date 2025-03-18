import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Employee = () => {
  const [employees, setEmployees] = useState([]); // State to store employees
  const [selectedEmployee, setSelectedEmployee] = useState(null); // Store employee for editing
  const [showEditModal, setShowEditModal] = useState(false); // Show/hide modal
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    name: "",
    role: "",
    wages_per_day: "",
  });

  useEffect(() => {
    fetchEmployees(); // Fetch employees on load
  }, []);

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
      fetchEmployees(); // Refresh the list
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
      fetchEmployees(); // Refresh list after deletion
    } catch (error) {
      console.error("Error deleting employee:", error.message);
    }
  };

  return (
    <div className="container">
      <h1 className="my-5">Employee List</h1>

      <div className="mb-3">
        <Link className="btn btn-success me-2" to="/dashboard/add-employee">
          Add Employee
        </Link>
        <button className="btn btn-danger" onClick={fetchEmployees}>
          Refresh
        </button>
      </div>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Username</th>
            <th>Name</th>
            <th>Role</th>
            <th>Wages Per Day</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.username}</td>
                <td>{employee.name}</td>
                <td>{employee.role}</td>
                <td>{employee.wages_per_day}</td>
                <td>
                  <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(employee)}>
                    Edit
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(employee._id)}>
                    Delete
                  </button>
                </td>
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

      {/* Edit Employee Modal */}
      {showEditModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Employee</h5>
                <button type="button" className="btn-close" onClick={() => setShowEditModal(false)}></button>
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
    </div>
  );
};

export default Employee;
