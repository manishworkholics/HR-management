import React from 'react';
import { useState, useEffect } from "react";
import Header from '../Components/Header'
import ProfileImg from '../assets/images/pro-img.png'
import callAPI from './Common_Method/api';

const Attendance = () => {
    const [attendance, setAttendance] = useState([]);
    const [currentDate, setCurrentDate] = useState(new Date().toISOString().split("T")[0]);

    const getTodayDate = () => {
        const today = new Date();
        return today.toISOString().split("T")[0]; 
    };

    const getAttendance = async () => {
        try {
            const response = await callAPI.get("/attendance");
            console.log("API Response:", response.data); 
    
            if (response?.data?.length > 0) {
                const selectedDate = getTodayDate(); 
                const filteredData = response.data.find(item => item._id === selectedDate);
                
                if (filteredData) {
                    setAttendance(filteredData.records || []);
                    console.log("Updated Attendance State:", filteredData.records);
                } else {
                    setAttendance([]);
                    console.log("No records found for", selectedDate);
                }
            }
        } catch (error) {
            console.error("Error fetching attendance:", error);
        }
    };
    
    useEffect(() => {
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
                                                {attendance?.data?.length > 0 ? (
                                                    attendance?.data?.map((employee, index) => (
                                                        <tr key={employee.id || index}>
                                                            <th scope="row">{index + 1}</th>
                                                            <td>
                                                                <img src={ProfileImg} alt="" className="tbl-empImg" />
                                                                {employee.name}
                                                            </td>
                                                            <td>{employee.user_name}</td>
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