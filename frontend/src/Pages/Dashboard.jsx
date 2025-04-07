import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import Calendar from '../Components/Calendar'
import { FaPhone } from 'react-icons/fa';
import { FaBirthdayCake } from 'react-icons/fa';
import { FaEnvelope } from 'react-icons/fa';
import { FaMapMarkerAlt } from 'react-icons/fa';
import callAPI from '../Pages/Common_Method/api'

const Dashboard = () => {
    const [users,setUsers] = useState('');

    const fetchUsersData = async () =>{
      try {
        const response = await callAPI.get(`/users`);
        if(response?.data){
            setUsers(response?.data || []);
        }
      } catch (error) {
        console.error("Error in fetching user:", error);
      }
    } 

    useEffect(() => {
        fetchUsersData();
    });

    return (
        <>
            <div className='container-fluid'>
                <Header />
                <div className="px-lg-5 px-0">
                    <div className="col-12 px-4">
                        <h1 className="my-4">Welcome, Priyanshi</h1>
                    </div>
                    <div className='row'>
                        <div className='col-lg-8 mb-4'>
                            <div className="card border-0 rounded-5 bg-ffffff94 h-100">
                                <div className="card-body">
                                    <div className="row g-0 bg-white rounded-4">
                                        {users?.data?.length &&
                                        users?.data?.map((user,index)=>{
                                            <div className="col-md-3 d-flex align-items-center">
                                            <div className='mx-auto'>
                                                <img
                                                    src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"
                                                    className="img-fluid rounded-start"
                                                    alt="User"
                                                    style={{ height: "200px", width: "200px", objectFit: "cover" }}
                                                />
                                                <div className=" ms-3 align-items-center">
                                                    <h5 className='text-center'>Web Developer</h5>
                                                    <p className='text-center'>User Id: 0001</p>
                                                </div>
                                            </div>
                                            {/* <!-- Vertical line --> */}
                                            <div className="border-start d-none d-lg-block" style={{ "height": "250px" }}></div>
                                        </div>
                                        <div className="col-md-8">
                                            <div className="card-body">
                                                <h1 className="card-title text-bold">Priyanshi Choudhary</h1>
                                                <p className="card-text pt-2 pt-md-4">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                                <div className='row pt-4'>
                                                    <div className='col-md-6 col-5'>
                                                        <p>
                                                            <FaPhone size={15} color="green" /> 987-653-149
                                                        </p>
                                                        <p>
                                                            <FaBirthdayCake size={15} color="purple" /> 14/03/2002
                                                        </p>
                                                    </div>
                                                    <div className='col-md-6 col-7'>

                                                        <p>
                                                            <FaEnvelope size={15} color="blue" /> priyanshi@gmail.com
                                                        </p>
                                                        <p>
                                                            <FaMapMarkerAlt size={15} color="green" /> 123 Main Street, Cityville
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        })}
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
                                                    <span className="text-muted">400</span>
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
                                        <table className="table table-hover mb-0 rounded-4 overflow-hidden h-100 overflow-y-scroll" style={{"max-height": "333px"}}>
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