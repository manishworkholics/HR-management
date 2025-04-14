//leave status 
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../Components/Header';

export default function LeaveStatus() {
    const [leaves, setLeaves] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const userId = localStorage.getItem("user_id");

        axios.get(`http://206.189.130.102:5050/api/applications/${userId}`)
            .then(res => {
                setLeaves(res.data || []);
            })
            .catch(err => {
                console.error("Error fetching leaves:", err);
            });
    }, []);

    return (
        <div className='container-fluid'>
            <div>
                <Header />
            </div>
            <div className="container mt-5 card bg-ffffff94 border-0 rounded-5 h-100">
                <h3 className="text-center mb-4">Leave Status</h3>
                <div className="table-responsive">
                    <table
                        className="table table-hover mb-0 rounded-4 overflow-hidden h-100 overflow-y-scroll mb-4"
                        style={{ "max-height": "333px" }}
                    >
                        <thead>
                            <tr className="table-warning">
                                <th scope="col">#</th>
                                <th scope="col">Leave Type</th>
                                <th scope="col">From Date</th>
                                <th scope="col">To Date</th>
                                <th scope="col">Reason</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="text-center py-4">
                                        <div
                                            className="spinner-border text-warning"
                                            role="status"
                                        >
                                            <span className="visually-hidden">
                                                Loading...
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            ) : leaves?.length ? (
                                leaves.map((leave, index) => (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{leave.leave_type}</td>
                                        <td>
                                            {leave.from_date
                                                ? new Date(leave.from_date).toLocaleDateString("en-GB")
                                                : "N/A"}
                                        </td>
                                        <td>
                                            {leave.to_date
                                                ? new Date(leave.to_date).toLocaleDateString("en-GB")
                                                : "N/A"}
                                        </td>
                                        <td>{leave.reason}</td>
                                        <td>
                                            <span className={`badge ${leave.status === 'approved' ? 'bg-success' : leave.status === 'rejected' ? 'bg-danger' : 'bg-warning'}`}>
                                                {leave.status || "Pending"}
                                            </span>

                                        </td>

                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="5"
                                        className="text-center text-muted py-4"
                                    >
                                        No attendance records found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div >
    );
}