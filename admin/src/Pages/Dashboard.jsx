import React from 'react'
import Header from '../Components/Header'
import TotalAppImg from '../assets/images/interview.1710874b575c5c9a24cde4ad43a4c04b.svg'
import totalEmployeeGraph from '../assets/images/totalEmployeeGraph.png'

const Dashboard = () => {
    return (
        <>
            <div className="container-fluid">
                <Header />
                <div className="px-5">
                    <div className="row">
                        <div className="col-12 px-4">
                            <h1 className="my-4">Welcome, Admin</h1>
                        </div>
                        <div className="col-lg-9 mb-4">
                            <div className="row">
                                <div className="col-md-4 mb-4">
                                    <div class="card border-0 rounded-5 bg-ffffff94 h-100">
                                        <div class="card-header pt-3 d-flex justify-content-between bg-transparent border-bottom-0">
                                            <h4 class="mb-0 fw-bold ">Employees Availability</h4>
                                        </div>
                                        <div class="card-body">
                                            <div class="row g-2 row-deck">
                                                <div class="col-md-6 col-sm-6">
                                                    <div class="card border-0 rounded-4">
                                                        <div class="card-body ">
                                                            <i class="fa-solid fa-user-check fs-3 text-success"></i>
                                                            <h5 class="mt-3 mb-0 fw-bold small-14">Attendance</h5>
                                                            <span class="text-muted">400</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-6 col-sm-6">
                                                    <div class="card border-0 rounded-4">
                                                        <div class="card-body ">
                                                            <i class="fa-solid fa-clock fs-3 text-warning"></i>
                                                            <h5 class="mt-3 mb-0 fw-bold small-14">Late Coming</h5>
                                                            <span class="text-muted">17</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-6 col-sm-6">
                                                    <div class="card border-0 rounded-4">
                                                        <div class="card-body ">
                                                            <i class="fa-solid fa-circle-xmark fs-3 text-danger"></i>
                                                            <h5 class="mt-3 mb-0 fw-bold small-14">Absent</h5>
                                                            <span class="text-muted">06</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-6 col-sm-6">
                                                    <div class="card border-0 rounded-4">
                                                        <div class="card-body ">
                                                            <i class="fa-solid fa-umbrella-beach fs-3 text-primary"></i>
                                                            <h5 class="mt-3 mb-0 fw-bold small-14">Leave Apply</h5>
                                                            <span class="text-muted">14</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 mb-4">
                                    <div class="card border-0 rounded-5 bg-ffffff94 h-100">
                                        <div class="card-header pt-3 d-flex justify-content-between bg-transparent border-bottom-0">
                                            <h4 class="mb-0 fw-bold ">Employees Availability</h4>
                                            <h4 class="mb-0 fw-bold">423</h4>
                                        </div>
                                        <div class="card-body">
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
                                        <div class="card-body">
                                            <h4 class="mb-3">Total Employees</h4>
                                            <h3 class="fs-30 mb-2">4006</h3>
                                            <h6>10.00% (30 days)</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12 mb-4">
                                    <div className="card bg-ffffff94 border-0 rounded-5 h-100">
                                        <div class="card-header pt-3 d-flex justify-content-between bg-transparent border-bottom-0">
                                            <h4 class="mb-0 fw-bold ">Leave Requests</h4>
                                        </div>
                                        <div class="card-body">
                                            <div className="table-responsive">
                                                <table class="table table-hover mb-0 rounded-4 overflow-hidden">
                                                    <thead>
                                                        <tr class="table-warning">
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
                            <div class="card rounded-5 bg-danger mb-4">
                                <div class="card-body row">
                                    <div class="col">
                                        <div class="bg-white rounded-circle text-center d-flex align-items-center justify-content-center" style={{ width: '70px', height: '70px' }}>
                                            <i class="fa-solid fa-file-lines fs-1"></i>
                                        </div>
                                        <h1 class="mt-3 mb-0 fw-bold text-white">1546</h1>
                                        <span class="text-white">Applications</span>
                                    </div>
                                    <div class="col d-flex align-items-center justify-content-center">
                                        <img class="img-fluid" src={TotalAppImg} alt="interview" />
                                    </div>
                                </div>
                            </div>
                            <div class="card mb-3 rounded-5 border-0">
                                <div class="card-body">
                                    <div class="d-flex align-items-center flex-fill">
                                        <div class="bg-success rounded-circle text-center d-flex align-items-center justify-content-center" style={{ width: '70px', height: '70px' }}>
                                            <i class="fa-solid fa-users fs-3 text-white"></i>
                                        </div>
                                        <div class="d-flex flex-column ps-3  flex-fill">
                                            <h6 class="fw-bold mb-0 fs-4">246</h6>
                                            <span class="text-muted">Interviews</span>
                                        </div>
                                        <i class="fa-solid fa-chart-simple text-muted fs-2"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="card mb-3 rounded-5 border-0">
                                <div class="card-body">
                                    <div class="d-flex align-items-center flex-fill">
                                        <div class="bg-info rounded-circle text-center d-flex align-items-center justify-content-center" style={{ width: '70px', height: '70px' }}>
                                            <i class="fa-solid fa-user-tie fs-3 text-white"></i>
                                        </div>
                                        <div class="d-flex flex-column ps-3  flex-fill">
                                            <h6 class="fw-bold mb-0 fs-4">101</h6>
                                            <span class="text-muted">Hired</span>
                                        </div>
                                        <i class="fa-solid fa-signal text-muted fs-2"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="card mb-3 rounded-5 border-0">
                                <div class="card-body">
                                    <div class="d-flex align-items-center flex-fill">
                                        <div class="bg-success rounded-circle text-center d-flex align-items-center justify-content-center" style={{ width: '70px', height: '70px' }}>
                                            <i class="fa-solid fa-users fs-3 text-white"></i>
                                        </div>
                                        <div class="d-flex flex-column ps-3  flex-fill">
                                            <h6 class="fw-bold mb-0 fs-4">246</h6>
                                            <span class="text-muted">Interviews</span>
                                        </div>
                                        <i class="fa-solid fa-chart-simple text-muted fs-2"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="card mb-3 rounded-5 border-0">
                                <div class="card-body">
                                    <div class="d-flex align-items-center flex-fill">
                                        <div class="bg-info rounded-circle text-center d-flex align-items-center justify-content-center" style={{ width: '70px', height: '70px' }}>
                                            <i class="fa-solid fa-user-tie fs-3 text-white"></i>
                                        </div>
                                        <div class="d-flex flex-column ps-3  flex-fill">
                                            <h6 class="fw-bold mb-0 fs-4">101</h6>
                                            <span class="text-muted">Hired</span>
                                        </div>
                                        <i class="fa-solid fa-signal text-muted fs-2"></i>
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