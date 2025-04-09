import React, { useState } from 'react';
import Header from '../Components/Header';
import callAPI from './Common_Method/api';

const Salary = () => {
    const [selectedDate, setSelectedDate] = useState('');
    const [showSlip, setShowSlip] = useState(false);
    const [errors, setErrors] = useState({});
    const user_id = localStorage.getItem("user_id");
    const [slipUrl, setSlipUrl] = useState('');

    const getStartAndEndDates = () => {
        if (!selectedDate) return { startDate: '', endDate: '' };

        const [year, month] = selectedDate.split('-');
        const monthIndex = parseInt(month) - 1;

        const startDate = new Date(year, monthIndex, 1);
        const endDate = new Date(year, monthIndex + 1, 0);

        return {
            startDate: startDate.toLocaleDateString(),
            endDate: endDate.toLocaleDateString()
        };
    };

    const viewSalarySlip = async () => {
        const currentDate = new Date();
        const selected = new Date(selectedDate);

        let formErrors = {};
        if (!selectedDate) {
            formErrors.date = "Please select a month";
        } else if (selected > currentDate) {
            formErrors.date = "Cannot generate slip for future date";
        }

        setErrors(formErrors);
        if (Object.keys(formErrors).length > 0) return;

        try {
            const response = await callAPI.get(`/salaries/get-salary-by-user/${user_id}`);
            const salarySlips = response.data;

            // Filter by selected month and year
            const slip = salarySlips.find(slip => {
                const slipDate = new Date(slip.date);
                return (
                    slipDate.getFullYear() === selected.getFullYear() &&
                    slipDate.getMonth() === selected.getMonth()
                );
            });

            if (slip) {
                setSlipUrl(slip.slip_url);
                setShowSlip(true);
            } else {
                setSlipUrl('');
                setShowSlip(false);
                setErrors({ api: "No salary slip available for the selected month." });
            }
        } catch (error) {
            console.error("Error fetching salary data:", error);
            setErrors({ api: "Unable to fetch salary slip. Please try again later." });
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

                        <div className="mb-3">
                            <label className="form-label">Select Month and Year</label>
                            <input
                                type="month"
                                className={`form-control ${errors.date ? 'is-invalid' : ''}`}
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                max={new Date().toISOString().slice(0, 7)}
                            />
                            {errors.date && <div className="invalid-feedback">{errors.date}</div>}
                        </div>

                        <div className="text-center mt-4">
                            <button type="button" onClick={viewSalarySlip} className="btn btn-secondary">
                                View Slip
                            </button>
                        </div>

                        <div className="mt-4">
                            {errors.api && (
                                <div className="alert alert-danger text-center">
                                    {errors.api}
                                </div>
                            )}

                            {showSlip && slipUrl && (
                                <div className="text-center mt-4">
                                    <iframe
                                        src={slipUrl}
                                        title="Salary Slip"
                                        width="100%"
                                        height="600px"
                                        className="border rounded"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Salary;
