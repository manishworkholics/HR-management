import React from 'react';
import { useState, useEffect } from "react";
import Header from '../Components/Header'
import ProfileImg from '../assets/images/pro-img.png'
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LeaveRequest = () => {
    const [employees, setEmployees] = useState([]);
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);

    const handlePreview = (imgUrl) => {
        setPreviewImage(imgUrl);
    };


    // Get Employees
    const getEmployees = async () => {
        try {
            setLoading(true);
            const response = await fetch("http://206.189.130.102:5050/api/applications", {
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

    const updateStatus = async (id, newStatus) => {
        try {
            const response = await fetch(`http://206.189.130.102:5050/api/applications/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus }) // Correct JSON structure
            });

            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            const result = await response.json();
            console.log("Status updated:", result);
            toast.success("Status updated successfully!");
            getEmployees();
            // Optional: Refresh or update state after status change
        } catch (error) {
            console.error("Error updating application status:", error.message);
            toast.error("Error updating application status");
        }
    };


    return (
        <>
            <div className="container-fluid attendance-page">
                <ToastContainer position="top-right" autoClose={3000} />
                <Header />
                <div className="px-lg-5 px-0">
                    <div className="row">
                        <div className="col-12 px-4">
                            <h1 className="my-4">Leave Request</h1>
                        </div>
                        <div className="col-md-12 mb-4">
                            <div className="card bg-ffffff94 border-0 rounded-5 h-100">
                                <div className="card-header pt-3 d-flex justify-content-between bg-transparent border-bottom-0">
                                    <h4 className="mb-0 fw-bold ">Attendance List</h4>
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
                                                        <th scope="col">Leave Type</th>
                                                        <th scope="col">From</th>
                                                        <th scope="col">To</th>
                                                        <th scope="col">Reason</th>
                                                        <th scope="col">Status</th>
                                                        <th scope="col" className=''>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {employees.length > 0 ? (
                                                       [...employees]
                                                       .sort((a, b) => {
                                                           if (a.status === "pending" && b.status !== "pending") return -1;
                                                           if (a.status !== "pending" && b.status === "pending") return 1;
                                                           return 0;
                                                       })
                                                       .map((employee, index) => (
                                                   
                                                            <tr key={employee.id}>
                                                                <th scope="row">{index + 1}</th>
                                                                <td>
                                                                    <img
                                                                        src={employee.image || ProfileImg}
                                                                        alt=""
                                                                        className="tbl-empImg shadow"
                                                                        style={{ cursor: "pointer", width: "40px", height: "40px", objectFit: "cover", borderRadius: "50%" }}
                                                                        onClick={() => handlePreview(employee.image || ProfileImg)}
                                                                    />
                                                                    {employee.user_id.name}
                                                                </td>
                                                                <td>{employee.user_id.username}</td>
                                                                <td>{employee.leave_type}</td>
                                                                <td>{employee.from_date}</td>
                                                                <td>{employee.to_date}</td>
                                                                <td>{employee.reason}</td>
                                                                <td className={
                                                                    employee.status === "pending" ? "text-warning":
                                                                    employee.status === "rejected" ? "text-danger":
                                                                    "text-success"
                                                                }>
                                                                    {employee.status || "approved"}
                                                                </td>
                                                                <td>
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-success text-white rounded-5 me-3"
                                                                        onClick={() => updateStatus(employee._id, "approved")} // Pass ID & status
                                                                    >
                                                                        Approve <span className="ms-2"><i className="fa-solid fa-thumbs-up"></i></span>
                                                                    </button>

                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-danger text-white rounded-5 me-3"
                                                                        onClick={() => updateStatus(employee._id, "rejected")} // Pass ID & status
                                                                    >
                                                                        Reject <span className="ms-2"><i className="fa-solid fa-thumbs-down"></i></span>
                                                                    </button>
                                                                </td>

                                                            </tr>
                                                        ))
                                                    ) : (
                                                        <tr>
                                                            <td colSpan="9" className="text-center">

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
                {/* Modal Image-Preview */}
                {previewImage && (
                    <div
                        className="modal fade show "
                        style={{ display: "block", background: "rgba(0,0,0,0.6)" }}
                        onClick={() => setPreviewImage(null)}
                    >
                        <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
                            <div className="modal-content" style={{ background: "rgba(0,0,0,0.8)" }}>
                                <div className="modal-header border-0">
                                    <h5 className="modal-title text-white">Image Preview</h5>
                                    <button type="button" className="btn-close bg-white rounded-circle" onClick={() => setPreviewImage(null)}></button>
                                </div>
                                <div className="modal-body text-center">
                                    <img src={previewImage} alt="Preview" className="img-fluid rounded shadow" />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default LeaveRequest



