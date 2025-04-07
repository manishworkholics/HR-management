import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import Calendar from '../Components/Calendar'
import { FaPhone } from 'react-icons/fa';
import { FaBirthdayCake } from 'react-icons/fa';
import { FaEnvelope } from 'react-icons/fa';
import { FaMapMarkerAlt } from 'react-icons/fa';
import callAPI from '../Pages/Common_Method/api'

const Dashboard = () => {
    const [users, setUsers] = useState({});
    const [attendance, setAttendance] = useState([]);
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



    useEffect(() => {
        fetchUsersData();
        fetchUserAttendace();
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
                        <div className='col-lg-8 mb-4'>
                            <div className="card border-0 rounded-5 bg-ffffff94 h-100">
                                <div className="card-body">
                                    <div className="row g-0 bg-white rounded-4">
                                        <div className="d-flex flex-wrap bg-white rounded-4 mb-4">
                                            <div className="col-md-3 d-flex align-items-center">
                                                <div className="mx-auto text-center">
                                                    <img
                                                        src={users?.profileImage || "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"}
                                                        className="img-fluid rounded-start"
                                                        alt="User"
                                                        style={{ height: "200px", width: "200px", objectFit: "cover" }}
                                                    />
                                                    <div className="mt-2">
                                                        <h5 className="text-center">{users?.role || "Web Developer"}</h5>
                                                        <p className="text-center">User Id: {users?._id || "0001"}</p>
                                                    </div>
                                                </div>
                                                <div className="border-start d-none d-lg-block ms-3" style={{ height: "250px" }}></div>
                                            </div>

                                            <div className="col-md-8 p-3">
                                                <div className="card-body">
                                                    <h1 className="card-title fw-bold">{users?.name || "Priyanshi Choudhary"}</h1>
                                                    <p className="card-text pt-2 pt-md-4">
                                                        {users?.description || "This is a wider card with supporting text below as a natural lead-in to additional content."}
                                                    </p>
                                                    <div className="row pt-4">
                                                        <div className="col-md-6 col-5">
                                                            <p><FaPhone size={15} color="green" /> {users?.phone || "987-653-149"}</p>
                                                            <p><FaBirthdayCake size={15} color="purple" /> {users?.dob || "14/03/2002"}</p>
                                                        </div>
                                                        <div className="col-md-6 col-7">
                                                            <p><FaEnvelope size={15} color="blue" /> {users?.email || "priyanshi@gmail.com"}</p>
                                                            <p><FaMapMarkerAlt size={15} color="green" /> {users?.address || "123 Main Street, Cityville"}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                </div>
                            </div>
                        </div>
                        <div className='col-lg-4 pb-4'>
                            <div className="card border-0 rounded-5 bg-ffffff94 h-100">
                                <div className="card-header pt-2 d-flex justify-content-between bg-transparent border-bottom-0">
                                    <h4 className="mt-2 fw-bold ">Your Availability</h4>
                                </div>
                                <div className="card-body pt-0">
                                    <div className="row g-2 row-deck">
                                        <div className="col-md-6 col-6">
                                            <div className="card border-0 rounded-4">
                                                <div className="card-body ">
                                                    <i className="fa-solid fa-user-check fs-3 text-success"></i>
                                                    <h5 className="mb-0 fw-bold small-14">Attendance</h5>
                                                    <span className="text-muted" >400</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-6">
                                            <div className="card border-0 rounded-4">
                                                <div className="card-body ">
                                                    <i className="fa-solid fa-clock fs-3 text-warning"></i>
                                                    <h5 className="mb-0 fw-bold small-14">Late Coming</h5>
                                                    <span className="text-muted">17</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-6">
                                            <div className="card border-0 rounded-4">
                                                <div className="card-body ">
                                                    <i className="fa-solid fa-circle-xmark fs-3 text-danger"></i>
                                                    <h5 className=" mb-0 fw-bold small-14">Absent</h5>
                                                    <span className="text-muted">06</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-6">
                                            <div className="card border-0 rounded-4">
                                                <div className="card-body ">
                                                    <i className="fa-solid fa-umbrella-beach fs-3 text-primary"></i>
                                                    <h5 className="mb-0 fw-bold small-14">Leave Apply</h5>
                                                    <span className="text-muted">14</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className="col-lg-8">
                            <div className="card border-0 rounded-5 h-100" style={{ backgroundColor: "#ffffff94" }}>
                                <div className="card-header pt-3 d-flex justify-content-between bg-transparent border-bottom-0">
                                    <h4 className="mb-0 fw-bold">Attendance</h4>
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
                                                {attendance?.length &&
                                                    attendance?.map((presence, index1) => (
                                                        <tr key={index1}>
                                                            <th scope="row">1</th>
                                                            <td>{presence.date || "20/03/25"}</td>
                                                            <td>{presence.user_entry_time || "10:30 AM"}</td>
                                                            <td>{presence.user_exit_time || "7:15 PM"}</td>
                                                            <td>{presence.status || "Present"}</td>
                                                        </tr>
                                                    ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-4 mt-2'>
                            <div className="card bg-ffffff94 border-0 rounded-5 h-100">
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