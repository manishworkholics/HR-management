import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import ProfileImg from "../assets/images/pro-img.png";
import Payslip from "../Components/SalarySlip";

const Salary = () => {
    const [attendanceData, setAttendanceData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [selectedEmployee, setSelectedEmployee] = useState(null); // 🆕
    const [showPayslip, setShowPayslip] = useState(false); // 🆕

    const getAttendanceData = async (start, end) => {
        try {
            setLoading(true);
            const response = await fetch(
                `http://206.189.130.102:5050/api/attendance/salaries?start_date=${start}&end_date=${end}`
            );
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            const result = await response.json();

            const updatedData = result.map((employee) => {
                const totalSalary =
                    employee.total_present_days && employee.wages_per_day
                        ? employee.total_present_days * employee.wages_per_day
                        : 0;

                return {
                    ...employee,
                    total_salary: totalSalary,
                };
            });

            setAttendanceData(updatedData);
        } catch (error) {
            console.error("Error fetching attendance data:", error.message);
            setError("Failed to load attendance data. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!startDate || !endDate) {
            setError("Please select both start and end dates.");
            return;
        }
        getAttendanceData(startDate, endDate);
    };

    const handlePrint = (employee) => {
        setSelectedEmployee(employee);
        setShowPayslip(true);

        setTimeout(() => {
            window.print();
        }, 300); // Let the DOM update first
    };

    useEffect(() => {
        const currentDate = new Date();
        const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 2)
            .toISOString()
            .split("T")[0];

        const today = currentDate.toISOString().split("T")[0];

        setStartDate(firstDayOfMonth);
        setEndDate(today);

        getAttendanceData(firstDayOfMonth, today);
    }, []);

    if (error) {
        return <div className="text-center text-danger">{error}</div>;
    }

    return (
        <div className="container-fluid employee-page">
            <Header />
            <div className="px-lg-5 px-0">
                <div className="row">
                    <div className="col-12 px-4">
                        <h1 className="my-4">Salary</h1>
                    </div>
                    <div className="col-md-12 mb-4">
                        <div className="card bg-ffffff94 border-0 rounded-5 h-100">
                            <div className="card-header pt-3 d-block d-lg-flex justify-content-between align-items-center bg-transparent border-bottom-0">
                                <h4 className="mb-3 fw-bold">Salary List</h4>
                                <form className="row g-3" onSubmit={handleSubmit}>
                                    {/* Date filters */}
                                    ...
                                </form>
                            </div>

                            {/* Show Payslip only when requested */}
                            {showPayslip && selectedEmployee && (
                                <div className="d-none d-print-block">
                                    <Payslip employee={selectedEmployee} />
                                </div>
                            )}

                            <div className="card-body">
                                {loading ? (
                                    <div className="text-center">
                                        <div className="spinner-border text-dark" role="status"></div>
                                        <p>Loading data...</p>
                                    </div>
                                ) : (
                                    <div className="table-responsive">
                                        <table className="table table-hover mb-0 rounded-4 overflow-hidden">
                                            <thead>
                                                <tr className="table-warning">
                                                    <th>#</th>
                                                    <th>Name</th>
                                                    <th>Job Title</th>
                                                    <th>Total Present Days</th>
                                                    <th>Wages /Day</th>
                                                    <th>Total Salary</th>
                                                    <th>Start Date</th>
                                                    <th>End Date</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {attendanceData.length > 0 ? (
                                                    attendanceData.map((employee, index) => (
                                                        <tr key={employee.id}>
                                                            <td>{index + 1}</td>
                                                            <td>{employee.name || "NA"}</td>
                                                            <td>{employee.role || "NA"}</td>
                                                            <td>{employee.total_present_days || "NA"}</td>
                                                            <td>{employee.wages_per_day || "NA"}/-</td>
                                                            <td>{employee.total_salary || "NA"}/-</td>
                                                            <td>{employee.start_date || "NA"}</td>
                                                            <td>{employee.end_date || "NA"}</td>
                                                            <td>
                                                                <button
                                                                    className="btn btn-secondary rounded-5"
                                                                    onClick={() => handlePrint(employee)}
                                                                >
                                                                    Print <i className="fa-solid fa-print ms-2"></i>
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="10" className="text-center">
                                                            No employees found
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Salary;
