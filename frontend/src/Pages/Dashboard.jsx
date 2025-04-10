import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import Calendar from '../Components/Calendar'
import { FaPhone } from 'react-icons/fa';
import { FaMars, FaVenus } from "react-icons/fa";
import { FaEnvelope } from 'react-icons/fa';
import { FaMapMarkerAlt } from 'react-icons/fa';
import callAPI from '../Pages/Common_Method/api'

const Dashboard = () => {
    const [users, setUsers] = useState({});
    const [attendance, setAttendance] = useState([]);
    const [totalAttendance, setTotalAttendance] = useState([]);
    const userId = localStorage.getItem('user_id')

    const fetchUsersData = async () => {
        if (!userId) {
            console.log("user id is missing");
        } else {
            console.log("user id", userId)
        }

        try {
            const response = await callAPI.get(`/users/${userId}`);
            if (response?.data) {
                setUsers(response.data);
            }
        } catch (error) {
            console.error("Error in fetching user:", error);
        }
    };

    const fetchUserAttendace = async () => {
        if (!userId) {
            console.log("user id is missing");
        } else {
            console.log("user id", userId)
        }

        try {
            const response = await callAPI.get(`/users/user/${userId}`);
            if (response?.data) {
                setAttendance(response.data);
            }
        } catch (error) {
            console.error("Error in fetching user:", error);
        }
    };

    const fetchTotalAttendace = async () => {
        if (!userId) {
            console.log("User ID is missing");
            return;
        }

        try {
            const response = await callAPI.get(`/dashboard/user-dashboard/${userId}`);
            console.log("API Response:", response.data);
            if (response?.data) {
                setTotalAttendance(response.data);
            }
        } catch (error) {
            console.error("Error fetching attendance data:", error);
        }
    };



    useEffect(() => {
        fetchUsersData();
        fetchUserAttendace();
        fetchTotalAttendace();
    }, [userId]);

    return (
        <>
            <div className='container-fluid'>
                <Header />
                <div className="px-lg-5 px-0">
                    <div className="col-12 px-4">
                        <h1 className="my-4">Welcome, {users?.username}</h1>
                    </div>
                    <div className='row'>
                        {totalAttendance ? (
                            <div className='col-lg-12 pb-4'>
                                <div className="card border-0 rounded-5 bg-ffffff94 h-100">
                                    <div className="card-header pt-2 d-flex justify-content-between bg-transparent border-bottom-0">
                                        <h4 className="mt-2 fw-bold">Your Availability</h4>
                                    </div>
                                    <div className="card-body pt-0">
                                        <div className="row g-2 row-deck">
                                            <div className="col-md-3 col-6">
                                                <div className="card border-0 rounded-4">
                                                    <div className="card-body">
                                                        <i className="fa-solid fa-user-check fs-3 text-success"></i>
                                                        <h5 className="mb-0 fw-bold small-14">Attendance</h5>
                                                        <span className="text-muted">{totalAttendance.totalAttendance}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-3 col-6">
                                                <div className="card border-0 rounded-4">
                                                    <div className="card-body">
                                                        <i className="fa-solid fa-clock fs-3 text-warning"></i>
                                                        <h5 className="mb-0 fw-bold small-14">Late Coming</h5>
                                                        <span className="text-muted">{totalAttendance.totalLateComing}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-3 col-6">
                                                <div className="card border-0 rounded-4">
                                                    <div className="card-body">
                                                        <i className="fa-solid fa-circle-xmark fs-3 text-danger"></i>
                                                        <h5 className="mb-0 fw-bold small-14">Absent</h5>
                                                        <span className="text-muted">{totalAttendance.totalAbsent}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-3 col-6">
                                                <div className="card border-0 rounded-4">
                                                    <div className="card-body">
                                                        <i className="fa-solid fa-umbrella-beach fs-3 text-primary"></i>
                                                        <h5 className="mb-0 fw-bold small-14">Leave Apply</h5>
                                                        <span className="text-muted">{totalAttendance.totalLeaveApplications}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <p>No attendance data available.</p>
                        )}
                    </div>
                    <div className='row'>
                        <div className='col-lg-8 mb-4'>
                            <div className="card border-0 rounded-5 bg-ffffff94 h-100">
                                <div className="card-body">
                                    <div className="row g-0 bg-white rounded-4">
                                        <div className="d-flex flex-column flex-md-row bg-white rounded-4 ">
                                            <div className="col-md-3 d-flex align-items-center">
                                                <div className="mx-auto text-center">
                                                    <img
                                                        src={users?.profileImage || "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"}
                                                        className="img-fluid rounded-start"
                                                        alt="User"
                                                        style={{ height: "200px", width: "200px", objectFit: "cover" }}
                                                    />
                                                    <div className="mt-2">
                                                        <h5 className="text-center">{users?.role}</h5>
                                                        <p className="text-center">User Name: {users?.username}</p>
                                                    </div>
                                                </div>
                                                <div className="border-start d-none d-lg-block ms-3" style={{ height: "250px" }}></div>
                                            </div>

                                            <div className="col-md-8 px-3">
                                                <div className="card-body">
                                                    <h1 className="card-title fw-bold">{users?.name}</h1>
                                                    <p className="card-text pt-2 pt-md-4">
                                                        {users?.description || "This is a wider card with supporting text below as a natural lead-in to additional content."}
                                                    </p>
                                                    <div className="row pt-4">
                                                        <div className="col-md-6 col-5">
                                                            <p>
                                                                <FaPhone size={15} color="green" className="me-2" />
                                                                {users?.mobile}
                                                            </p>

                                                            <p><FaMars size={15} color="blue" className="me-2" />
                                                                {users?.gender || "Female"}</p>
                                                        </div>
                                                        <div className="col-md-6 col-7">
                                                            <p><FaEnvelope size={15} color="blue" className="me-2" /> {users?.mail_id}</p>
                                                            <p><FaMapMarkerAlt size={15} color="green" className="me-2" /> {users?.adress}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-4 mb-lg-0 mb-3'>
                            <div className="card bg-ffffff94 border-0 rounded-5 ">
                                <div className="card-body">
                                    <Calendar />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>


    )
}

export default Dashboard


//  {totalAttendance ? (
//     <div className='col-lg-4 pb-4'>
//     <div className="card border-0 rounded-5 bg-ffffff94 h-100">
//         <div className="card-header pt-2 d-flex justify-content-between bg-transparent border-bottom-0">
//             <h4 className="mt-2 fw-bold">Your Availability</h4>
//         </div>
//         <div className="card-body pt-0">
//             <div className="row g-2 row-deck">
//                 <div className="col-md-6 col-6">
//                     <div className="card border-0 rounded-4">
//                         <div className="card-body">
//                             <i className="fa-solid fa-user-check fs-3 text-success"></i>
//                             <h5 className="mb-0 fw-bold small-14">Attendance</h5>
//                             <span className="text-muted">{totalAttendance.totalAttendance}</span>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="col-md-6 col-6">
//                     <div className="card border-0 rounded-4">
//                         <div className="card-body">
//                             <i className="fa-solid fa-clock fs-3 text-warning"></i>
//                             <h5 className="mb-0 fw-bold small-14">Late Coming</h5>
//                             <span className="text-muted">{totalAttendance.totalLateComing}</span>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="col-md-6 col-6">
//                     <div className="card border-0 rounded-4">
//                         <div className="card-body">
//                             <i className="fa-solid fa-circle-xmark fs-3 text-danger"></i>
//                             <h5 className="mb-0 fw-bold small-14">Absent</h5>
//                             <span className="text-muted">{totalAttendance.totalAbsent}</span>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="col-md-6 col-6">
//                     <div className="card border-0 rounded-4">
//                         <div className="card-body">
//                             <i className="fa-solid fa-umbrella-beach fs-3 text-primary"></i>
//                             <h5 className="mb-0 fw-bold small-14">Leave Apply</h5>
//                             <span className="text-muted">{totalAttendance.totalLeaveApplications}</span>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </div>
// </div>
// ) : (
// <p>No attendance data available.</p>
// )}