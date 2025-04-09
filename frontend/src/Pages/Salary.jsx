import React, { useState } from 'react';
import Header from '../Components/Header';
import SalarySlip from '../Components/SalarySlip'; // or Payslip if that's your main component

const Salary = () => {
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [showSlip, setShowSlip] = useState(false);

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const years = [
        "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022",
        "2023", "2024", "2025"
    ];

    // Dummy employee data
    const employee = {
        name: "John Doe",
        role: "Software Engineer",
        total_present_days: 22,
        wages_per_day: 800
    };

    const getStartAndEndDates = () => {
        const monthIndex = months.indexOf(selectedMonth);
        const year = parseInt(selectedYear, 10);
        const startDate = new Date(year, monthIndex, 1);
        const endDate = new Date(year, monthIndex + 1, 0); // last day of the month
        return {
            startDate: startDate.toLocaleDateString(),
            endDate: endDate.toLocaleDateString()
        };
    };

    const viewSalarySlip = () => {
        if (selectedYear && selectedMonth) {
            setShowSlip(true);
        } else {
            alert("Please select month and year for salary slip");
        }
    };

    const { startDate, endDate } = getStartAndEndDates();

    return (
        <div className='container-fluid'>
            <Header />
            <div className='container mt-5'>
                <div className="card bg-light border-0 rounded-5 shadow-lg">
                    <div className="card-body px-5 py-4">
                        <h2 className="card-title text-center mb-4">Download Salary Slip</h2>
                        <div className='row'>
                            <div className='col-md-6 mb-3'>
                                <select className="form-select" value={selectedYear} onChange={e => setSelectedYear(e.target.value)}>
                                    <option value="">Select Year</option>
                                    {years.map((year, index) => (
                                        <option key={index} value={year}>{year}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='col-md-6'>
                                <select className="form-select" value={selectedMonth} onChange={e => setSelectedMonth(e.target.value)}>
                                    <option value="">Select Month</option>
                                    {months.map((month, index) => (
                                        <option key={index} value={month}>{month}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="text-center mt-4">
                            <button type="button" onClick={viewSalarySlip} className="btn btn-secondary">View Slip</button>
                        </div>

                        {/* Salary Slip */}
                        <div className="mt-4">
                            {showSlip && (
                                <SalarySlip
                                    employee={employee}
                                    startDate={startDate}
                                    endDate={endDate}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Salary;
