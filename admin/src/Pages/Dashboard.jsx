import React from 'react';
import { useState, useEffect } from "react";
import Header from '../Components/Header'
import TotalAppImg from '../assets/images/interview.1710874b575c5c9a24cde4ad43a4c04b.svg'
import Calendar from '../Components/Calendar'
import Chart from "react-apexcharts";

const Dashboard = () => {

    const [employees, setEmployees] = useState();
    const [data, setData] = useState();

    const maledata = data?.malepercent;
    const femaledata = data?.femalepercent;

    const chartData = {
        series: [70, 30],
        options: {
            chart: {
                type: "pie",
            },
            labels: ["Male", "Female"],
            legend: {
                position: 'bottom'
            },
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 300
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }]
        },
    };
    // Get Employees
    const getEmployees = async () => {
        try {
            const response = await fetch("http://206.189.130.102:5050/api/applications", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`)
            const result = await response.json();
            setEmployees(result);
        } catch (error) {
            console.error("Error fetching employees:", error.message);
        }
    };

    // Get Employees
    const getData = async () => {
        try {
            const response = await fetch("http://206.189.130.102:5050/api/dashboard/dashboard-detail", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`)
            const result = await response.json();
            setData(result);
        } catch (error) {
            console.error("Error fetching employees:", error.message);
        }
    };

    useEffect(() => {
        getEmployees();
        getData();
    }, []);



    return (
        <>
            <div className="container-fluid">
                <Header />
                <div className="px-lg-5 px-0">
                    <div className="row">
                        <div className="col-12 px-4">
                            <h1 className="my-4">Welcome, Admin</h1>
                        </div>
                        <div className="col-lg-8 mb-4">
                            <div className="row">
                                <div className="col-md-12 mb-4">
                                    <div className="card border-0 rounded-5 bg-ffffff94 h-100">
                                        <div className="card-header pt-3 d-flex justify-content-between bg-transparent border-bottom-0">
                                            <h4 className="mb-0 fw-bold">Employees Availability</h4>
                                        </div>
                                        <div className="card-body">
                                            <div className="row g-2 row-deck">
                                                <div className="col-md-6 col-sm-6">
                                                    <div className="card border-0 rounded-4">
                                                        <div className="card-body ">
                                                            <i className="fa-solid fa-user-check fs-3 text-success"></i>
                                                            <h5 className="mt-3 mb-0 fw-bold small-14">Attendance</h5>
                                                            <span className="text-muted">{data?.totalAttendance}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-sm-6">
                                                    <div className="card border-0 rounded-4">
                                                        <div className="card-body ">
                                                            <i className="fa-solid fa-clock fs-3 text-warning"></i>
                                                            <h5 className="mt-3 mb-0 fw-bold small-14">Late Coming</h5>
                                                            <span className="text-muted">{data?.totalLateComing}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-sm-6">
                                                    <div className="card border-0 rounded-4">
                                                        <div className="card-body ">
                                                            <i className="fa-solid fa-circle-xmark fs-3 text-danger"></i>
                                                            <h5 className="mt-3 mb-0 fw-bold small-14">Absent</h5>
                                                            <span className="text-muted">{data?.totalAbsent}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-sm-6">
                                                    <div className="card border-0 rounded-4">
                                                        <div className="card-body ">
                                                            <i className="fa-solid fa-umbrella-beach fs-3 text-primary"></i>
                                                            <h5 className="mt-3 mb-0 fw-bold small-14">Leave Apply</h5>
                                                            <span className="text-muted">{data?.totalLeaveApplications}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 mb-4">
                                    <div className="card border-0 rounded-5 bg-ffffff94 h-100">
                                        <div className="card-header pt-3 d-flex justify-content-between bg-transparent border-bottom-0">
                                            <h4 className="mb-0 fw-bold ">Employees Availability</h4>
                                            <h4 className="mb-0 fw-bold">423</h4>
                                        </div>
                                        <div className="card-body">
                                            <div className="row h-100">
                                                <div className="col-12">


                                                    <Chart
                                                        options={chartData.options}
                                                        series={chartData.series}
                                                        type="pie"
                                                        width="100%"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 mb-4">
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
                                                            <th scope="col">Name</th>
                                                            <th scope="col">Leave Type</th>
                                                            <th scope="col">From Date</th>
                                                            <th scope="col">To Date</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>


                                                        {employees
                                                            ?.filter((employee) => employee?.status === 'pending')
                                                            ?.map((employee, index) => (
                                                                <tr key={index}>
                                                                    <th scope="row">{index + 1}</th>
                                                                    <td>{employee?.user_id?.name}</td>
                                                                    <td>{employee?.leave_type}</td>
                                                                    <td>{employee?.from_date}</td>
                                                                    <td>{employee?.to_date}</td>
                                                                </tr>
                                                            ))}

                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 mb-4">
                            <div className="card rounded-5 bg-danger mb-4">
                                <div className="card-body row">
                                    <div className="col">
                                        <div className="d-flex justify-content-center mt-5">
                                            <div className="bg-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: '70px', height: '70px' }}>
                                                <i className="fa-solid fa-file-lines fs-1"></i>
                                            </div>
                                        </div>

                                        <h1 className="mt-3 mb-0 fw-bold text-white text-center">1546</h1>
                                        <p className="text-white text-center">Applications</p>
                                    </div>
                                    <div className="col d-flex align-items-center justify-content-center">
                                        <img className="img-fluid" src={TotalAppImg} alt="interview" />
                                    </div>
                                </div>
                            </div>
                            {/* for small and medium screens */}
                            <div className="ipad-cards">
                                <div className="row">
                                    <div className="col-12 col-md-6 col-lg-12 mb-3">
                                        <div className="card rounded-5 border-0">
                                            <div className="card-body">
                                                <div className="d-flex align-items-center flex-fill">
                                                    <div className="bg-success rounded-circle d-flex align-items-center justify-content-center" style={{ width: '70px', height: '70px' }}>
                                                        <i className="fa-solid fa-users fs-3 text-white"></i>
                                                    </div>
                                                    <div className="d-flex flex-column ps-3 flex-fill">
                                                        <h6 className="fw-bold mb-0 fs-4">246</h6>
                                                        <span className="text-muted">Interviews</span>
                                                    </div>
                                                    <i className="fa-solid fa-chart-simple text-muted fs-2"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-12  col-lg-12 col-md-6 mb-3">
                                        <div className="card rounded-5 border-0">
                                            <div className="card-body">
                                                <div className="d-flex align-items-center flex-fill">
                                                    <div className="bg-info rounded-circle d-flex align-items-center justify-content-center" style={{ width: '70px', height: '70px' }}>
                                                        <i className="fa-solid fa-user-tie fs-3 text-white"></i>
                                                    </div>
                                                    <div className="d-flex flex-column ps-3 flex-fill">
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

                            <div className=" ipad-cards">
                                <div className="row">
                                    <div className="col-12 col-lg-12 col-md-6 mb-3">
                                        <div className="card rounded-5 border-0">
                                            <div className="card-body">
                                                <div className="d-flex align-items-center flex-fill">
                                                    <div className="bg-success rounded-circle d-flex align-items-center justify-content-center" style={{ width: '70px', height: '70px' }}>
                                                        <i className="fa-solid fa-users fs-3 text-white"></i>
                                                    </div>
                                                    <div className="d-flex flex-column ps-3 flex-fill">
                                                        <h6 className="fw-bold mb-0 fs-4">246</h6>
                                                        <span className="text-muted">Interviews</span>
                                                    </div>
                                                    <i className="fa-solid fa-chart-simple text-muted fs-2"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-12 col-lg-12 col-md-6 mb-3">
                                        <div className="card rounded-5 border-0">
                                            <div className="card-body">
                                                <div className="d-flex align-items-center flex-fill">
                                                    <div className="bg-info rounded-circle d-flex align-items-center justify-content-center" style={{ width: '70px', height: '70px' }}>
                                                        <i className="fa-solid fa-user-tie fs-3 text-white"></i>
                                                    </div>
                                                    <div className="d-flex flex-column ps-3 flex-fill">
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
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard