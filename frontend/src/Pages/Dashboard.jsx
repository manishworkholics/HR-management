import React from 'react'
import Header from '../Components/Header'
import TotalAppImg from '../assets/images/interview.1710874b575c5c9a24cde4ad43a4c04b.svg'
import totalEmployeeGraph from '../assets/images/totalEmployeeGraph.png'
import Calendar from '../Components/Calendar'

const Dashboard = () => {
    return (
        <>
            <div className="container-fluid">
                <Header />
                <div className="px-lg-5 px-0">
                    <div className="row">
                        <div className="col-12 px-4">
                            <h1 className="my-4">Welcome, Priyanshi</h1>
                        </div>
                        <div className="col-lg-9 mb-4">
                            <div className="row">
                                <div className="col-md-4 mb-4">
                                    <div className="card border-0 rounded-5 bg-ffffff94 h-100">
                                        <div className="card-header pt-3 d-flex justify-content-between bg-transparent border-bottom-0">
                                            <h4 className="mb-0 fw-bold ">Your Availability</h4>
                                        </div>
                                        <div className="card-body">
                                            <div className="row g-2 row-deck">
                                                <div className="col-md-6 col-sm-6">
                                                    <div className="card border-0 rounded-4">
                                                        <div className="card-body ">
                                                            <i className="fa-solid fa-user-check fs-3 text-success"></i>
                                                            <h5 className="mt-3 mb-0 fw-bold small-14">Attendance</h5>
                                                            <span className="text-muted">400</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-sm-6">
                                                    <div className="card border-0 rounded-4">
                                                        <div className="card-body ">
                                                            <i className="fa-solid fa-clock fs-3 text-warning"></i>
                                                            <h5 className="mt-3 mb-0 fw-bold small-14">Late Coming</h5>
                                                            <span className="text-muted">17</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-sm-6">
                                                    <div className="card border-0 rounded-4">
                                                        <div className="card-body ">
                                                            <i className="fa-solid fa-circle-xmark fs-3 text-danger"></i>
                                                            <h5 className="mt-3 mb-0 fw-bold small-14">Absent</h5>
                                                            <span className="text-muted">06</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-sm-6">
                                                    <div className="card border-0 rounded-4">
                                                        <div className="card-body ">
                                                            <i className="fa-solid fa-umbrella-beach fs-3 text-primary"></i>
                                                            <h5 className="mt-3 mb-0 fw-bold small-14">Leave Apply</h5>
                                                            <span className="text-muted">14</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 mb-4">
                                    <div className="card border-0 rounded-5 bg-ffffff94 h-100">
                                        <div className="card-header pt-3 d-flex justify-content-between bg-transparent border-bottom-0">
                                            <h4 className="mb-0 fw-bold ">Your Availability</h4>
                                            <h4 className="mb-0 fw-bold">423</h4>
                                        </div>
                                        <div className="card-body">
                                            <div className="row h-100">
                                                <div className="col-12">
                                                    <img src={totalEmployeeGraph} alt="" className="w-100 h-100 object-fit-cover rounded-4" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 mb-4">
                                    <div className="card bg-ffffff94 border-0 rounded-5 h-100">
                                        <div className="card-body">
                                            <Calendar />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12 mb-4">
                                    <div className="card bg-ffffff94 border-0 rounded-5 h-100">
                                        <div className="card-header pt-3 d-flex justify-content-between bg-transparent border-bottom-0">
                                            <h4 className="mb-0 fw-bold ">Today Leave Requests</h4>
                                        </div>
                                        <div className="card-body">
                                            <div className="table-responsive">
                                                <table className="table table-hover mb-0 rounded-4 overflow-hidden">
                                                    <thead>
                                                        <tr className="table-warning">
                                                            <th scope="col">#</th>
                                                            <th scope="col">First</th>
                                                            <th scope="col">Last</th>
                                                            <th scope="col">Handle</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <th scope="row">1</th>
                                                            <td>Mark</td>
                                                            <td>Otto</td>
                                                            <td>@mdo</td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">2</th>
                                                            <td>Jacob</td>
                                                            <td>Thornton</td>
                                                            <td>@fat</td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">3</th>
                                                            <td colspan="2">Larry the Bird</td>
                                                            <td>@twitter</td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">4</th>
                                                            <td>Jacob</td>
                                                            <td>Thornton</td>
                                                            <td>@fat</td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">5</th>
                                                            <td>Jacob</td>
                                                            <td>Thornton</td>
                                                            <td>@fat</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 mb-4">
                            <div className="card rounded-5 bg-danger mb-4">
                                <div className="card-body row">
                                    <div className="col">
                                        <div className="bg-white rounded-circle text-center d-flex align-items-center justify-content-center" style={{ width: '70px', height: '70px' }}>
                                            <i className="fa-solid fa-file-lines fs-1"></i>
                                        </div>
                                        <h1 className="mt-3 mb-0 fw-bold text-white">1546</h1>
                                        <span className="text-white">Applications</span>
                                    </div>
                                    <div className="col d-flex align-items-center justify-content-center">
                                        <img className="img-fluid" src={TotalAppImg} alt="interview" />
                                    </div>
                                </div>
                            </div>
                            <div className="card mb-3 rounded-5 border-0">
                                <div className="card-body">
                                    <div className="d-flex align-items-center flex-fill">
                                        <div className="bg-success rounded-circle text-center d-flex align-items-center justify-content-center" style={{ width: '70px', height: '70px' }}>
                                            <i className="fa-solid fa-users fs-3 text-white"></i>
                                        </div>
                                        <div className="d-flex flex-column ps-3  flex-fill">
                                            <h6 className="fw-bold mb-0 fs-4">246</h6>
                                            <span className="text-muted">Interviews</span>
                                        </div>
                                        <i className="fa-solid fa-chart-simple text-muted fs-2"></i>
                                    </div>
                                </div>
                            </div>
                            <div className="card mb-3 rounded-5 border-0">
                                <div className="card-body">
                                    <div className="d-flex align-items-center flex-fill">
                                        <div className="bg-info rounded-circle text-center d-flex align-items-center justify-content-center" style={{ width: '70px', height: '70px' }}>
                                            <i className="fa-solid fa-user-tie fs-3 text-white"></i>
                                        </div>
                                        <div className="d-flex flex-column ps-3  flex-fill">
                                            <h6 className="fw-bold mb-0 fs-4">101</h6>
                                            <span className="text-muted">Hired</span>
                                        </div>
                                        <i className="fa-solid fa-signal text-muted fs-2"></i>
                                    </div>
                                </div>
                            </div>
                            <div className="card mb-3 rounded-5 border-0">
                                <div className="card-body">
                                    <div className="d-flex align-items-center flex-fill">
                                        <div className="bg-success rounded-circle text-center d-flex align-items-center justify-content-center" style={{ width: '70px', height: '70px' }}>
                                            <i className="fa-solid fa-users fs-3 text-white"></i>
                                        </div>
                                        <div className="d-flex flex-column ps-3  flex-fill">
                                            <h6 className="fw-bold mb-0 fs-4">246</h6>
                                            <span className="text-muted">Interviews</span>
                                        </div>
                                        <i className="fa-solid fa-chart-simple text-muted fs-2"></i>
                                    </div>
                                </div>
                            </div>
                            <div className="card mb-3 rounded-5 border-0">
                                <div className="card-body">
                                    <div className="d-flex align-items-center flex-fill">
                                        <div className="bg-info rounded-circle text-center d-flex align-items-center justify-content-center" style={{ width: '70px', height: '70px' }}>
                                            <i className="fa-solid fa-user-tie fs-3 text-white"></i>
                                        </div>
                                        <div className="d-flex flex-column ps-3  flex-fill">
                                            <h6 className="fw-bold mb-0 fs-4">101</h6>
                                            <span className="text-muted">Hired</span>
                                        </div>
                                        <i className="fa-solid fa-signal text-muted fs-2"></i>
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

export default Dashboard