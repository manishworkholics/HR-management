import React from 'react';
import { useState, useEffect } from "react";
import Header from '../Components/Header'
import ProfileImg from '../assets/images/pro-img.png'

const MonthlyAttendance = () => {
    const [currentDate, setCurrentDate] = useState(new Date().toISOString().split("T")[0]);
    const [attendanceData, setAttendanceData] = useState([]);
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    const getDaysInMonth = (month, year) => {
        return new Date(year, month, 0).getDate();
    };

    const daysInMonth = getDaysInMonth(currentMonth, currentYear);

    // Fetch attendance data for the selected month
    const fetchAttendanceData = () => {
        const requestOptions = {
            method: "GET",
            redirect: "follow",
        };

        fetch(`http://localhost:4000/api/attendance?month=${currentMonth}&year=${currentYear}`, requestOptions)
            .then((response) => response.json())
            .then((data) => setAttendanceData(data))
            .catch((error) => console.error("Error fetching attendance data:", error));
    };

    // Fetch data whenever the month or year changes
    useEffect(() => {
        fetchAttendanceData();
    }, [currentMonth, currentYear]);

    // Handle navigation between months
    const handlePreviousMonth = () => {
        if (currentMonth === 1) {
            setCurrentMonth(12);
            setCurrentYear((prevYear) => prevYear - 1);
        } else {
            setCurrentMonth((prevMonth) => prevMonth - 1);
        }
    };

    const handleNextMonth = () => {
        if (currentMonth === 12) {
            setCurrentMonth(1);
            setCurrentYear((prevYear) => prevYear + 1);
        } else {
            setCurrentMonth((prevMonth) => prevMonth + 1);
        }
    };

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
                                <div className="card-header pt-3 d-block d-lg-flex justify-content-between bg-transparent border-bottom-0">
                                    <h4 className="mb-3 mb-lg-0 fw-bold ">Monthly Attendance</h4>
                                    <div className="mb-3 mb-lg-0 d-flex d-lg-block justify-content-center">
                                        <input type="date" value={currentDate} onChange={(e) => setCurrentDate(e.target.value)} />
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <button className="btn btn-warning rounded-pill" onClick={handlePreviousMonth}>
                                            <i class="fa-solid fa-arrow-left"></i>
                                        </button>
                                        <h4 className='mx-2 mb-0'>
                                            {new Date(currentYear, currentMonth - 1).toLocaleString("default", { month: "long" })} {currentYear}
                                        </h4>
                                        <button className="btn btn-warning rounded-pill" onClick={handleNextMonth}>
                                            <i class="fa-solid fa-arrow-right"></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table table-hover mb-0 rounded-4 overflow-hidden">
                                            <thead>
                                                <tr className="table-warning">
                                                    <th scope="col">#</th>
                                                    <th scope="col">Employee</th>
                                                    {Array.from({ length: daysInMonth }, (_, i) => (
                                                        <th key={i + 1}>{i + 1}</th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {attendanceData.map((employee, index) => (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>
                                                            <img src={ProfileImg} alt="" className="tbl-empImg" />
                                                            {employee.name}
                                                        </td>
                                                        {Array.from({ length: daysInMonth }, (_, i) => (
                                                            <td
                                                                key={i}
                                                                className={
                                                                    employee.days && employee.days[i] === "✔️"
                                                                        ? "text-success"
                                                                        : employee.days && employee.days[i] === "🔶"
                                                                            ? "text-warning"
                                                                            : "text-danger"
                                                                }
                                                            >
                                                                {employee.days && employee.days[i] ? employee.days[i] : ""}
                                                            </td>
                                                        ))}
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
            </div>
        </>
    )
}

export default MonthlyAttendance