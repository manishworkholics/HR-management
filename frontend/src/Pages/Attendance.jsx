import React from 'react';
import { useState, useEffect } from "react";
import Header from '../Components/Header'
import ProfileImg from '../assets/images/pro-img.png'
import callAPI from './Common_Method/api';

const Attendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(false);
  const userId = localStorage.getItem('user_id')

  const fetchUserAttendace = async () => {
    if (!userId) {
        console.log("user id is missing");
    } else {
        console.log("user id", userId)
    }
    try {
        setLoading(true);
        const response = await callAPI.get(`/users/user/${userId}`);
        if (response?.data) {
            setAttendance(response.data);
        }
    } catch (error) {
        console.error("Error in fetching user:", error);
    } finally {
        setLoading(false);
      }
};

 useEffect(() => {
        fetchUserAttendace();
    }, [userId]);

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
                                    <table className="table table-hover mb-0 rounded-4 overflow-hidden h-100 overflow-y-scroll" style={{ "max-height": "333px" }}>
                                            <thead>
                                                <tr className="table-warning">
                                                    <th scope="col">#</th>
                                                    <th scope="col">Date</th>
                                                    <th scope="col">Entry time</th>
                                                    <th scope="col">Exit time</th>
                                                    <th scope="col">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                        {loading ? (
                          <tr>
                            <td colSpan="5" className="text-center py-4">
                              <div className="spinner-border text-warning" role="status">
                                <span className="visually-hidden">Loading...</span>
                              </div>
                            </td>
                          </tr>
                        ) : attendance?.length ? (
                          attendance.map((presence, index) => (
                            <tr key={index}>
                              <th scope="row">{index + 1}</th>
                              <td>{presence.date || "20/03/25"}</td>
                              <td>{presence.user_entry_time || "10:30 AM"}</td>
                              <td>{presence.user_exit_time || "7:15 PM"}</td>
                              <td>{presence.status || "Present"}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="5" className="text-center text-muted py-4">
                              No attendance records found.
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