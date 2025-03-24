import React from 'react';
import { useState, useEffect } from "react";
import Header from '../Components/Header'
import ProfileImg from '../assets/images/pro-img.png'
import callAPI from './Common_Method/api';

const Attendance = () => {
    const [attendanceEmployees, setAttendanceEmployees] = useState([]);
    const [attendance, setAttendance] = useState([]);
    const [currentDate, setCurrentDate] = useState(new Date().toISOString().split("T")[0]);

    // Get Employees
    // const getEmployees = async () => {
    //     try {
    //         const response = await fetch("http://localhost:4000/api/attendance/employees", {
    //             method: "GET",
    //             headers: { "Content-Type": "application/json" },
    //         });
    //         if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`)
    //         const result = await response.json();
    //         setAttendanceEmployees(result);
    //     } catch (error) {
    //         console.error("Error fetching employees:", error.message);
    //     }
    // };

    const getAttendance = async () => {
        try {
            const response = await callAPI.post("/attendance/bulk", {
                attendanceRecords: attendanceEmployees.map(emp => ({
                    user_id: emp._id,
                    date: currentDate,
                    user_entry_time: emp.user_entry_time || "09:00 AM", 
                    user_exit_time: emp.user_exit_time || "06:00 PM",  
                }))
            });
            console.log("API Response:", response.data);
    
            if (response?.data?.attendanceRecords) {
                setAttendance(response.data.attendanceRecords);
            }
        } catch (error) {
            console.error("Error fetching attendance:", error);
        }
    };
    

    useEffect(() => {
        // getEmployees();
        getAttendance();
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
                                    <h4 className="mb-0 fw-bold ">Attendance</h4>
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
                                                    <th scope="col">Date</th>
                                                    <th scope="col">Punching</th>
                                                    <th scope="col">Punch out</th>
                                                    <th scope="col">Attendance</th>
                                                    <th scope="col">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {attendance?.data?.attendanceRecords?.length > 0 ? (
                                                    attendance?.data?.attendanceRecords?.map((employee, index) => (
                                                        <tr key={employee.id || index}>
                                                            <th scope="row">{index + 1}</th>
                                                            <td>
                                                                <img src={ProfileImg} alt="" className="tbl-empImg" />
                                                                {employee.name}
                                                            </td>
                                                            <td>{employee.username}</td>
                                                            <td>{employee.role}</td>
                                                            <td>{employee.date}</td>
                                                            <td>{employee.user_entry_time}</td>
                                                            <td>{employee.user_exit_time}</td>
                                                            <td>
                                                                <select className="form-select" aria-label="Default select example">
                                                                            <option  value="1" selected>Present</option>
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