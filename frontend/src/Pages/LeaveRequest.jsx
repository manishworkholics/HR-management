import React, { useEffect, useState } from 'react';
import Header from '../Components/Header';
import callAPI from './Common_Method/api';

const LeaveRequest = () => {
    const [formData, setFormData] = useState({
        reasons: [],
        leaveReason: '',
        leaveDate: '',
        returnDate: '',
        totalDays: ''
    });
    const [leaveData, setLeaveData] = useState({});
    const [errors, setErrors] = useState({});
    const userId = localStorage.getItem('user_id')

    const reasonsList = [
        "Doctor Appointment", "Sick-Family", "Sick-Self", "Vacation",
        "Worker's Comp", "Funeral", "Military", "Jury Duty",
        "Casual Leave", "Emergency Leave", "Other"
    ];

    const submitLeaveApplication = async () => {
        try {
            const response = await callAPI.post("/applications", {
                leave_type: formData.leaveReason,
                from_date: formData.leaveDate, 
                to_date: formData.returnDate,
                reason: formData.reasons.join(", "), 
                user_id: userId
            });
              
            if (response?.data) {
                console.log("Leave submitted:", response.data);
            }
        } catch (error) {
            console.error("Error submitting leave application:", error);
        }
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleCheckboxChange = (e) => {
        const { id, checked, value } = e.target;
        const updatedReasons = checked
            ? [...formData.reasons, value]
            : formData.reasons.filter(reason => reason !== value);

        setFormData(prev => ({ ...prev, reasons: updatedReasons }));
    };

    const validateForm = () => {
        let formErrors = {};
        if (formData.reasons.length === 0) formErrors.reasons = "Select at least one reason";
        if (!formData.leaveReason) formErrors.leaveReason = "Leave Reason is required";
        if (!formData.leaveDate) formErrors.leaveDate = "Leave Date is required";
        if (!formData.returnDate) formErrors.returnDate = "Return Date is required";
        if (formData.leaveDate && formData.returnDate && formData.returnDate < formData.leaveDate)
            formErrors.returnDate = "Return Date must be after Leave Date";
        if (!formData.totalDays || formData.totalDays <= 0)
            formErrors.totalDays = "Total Days must be greater than 0";

        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log("Form submitted:", formData);
            alert("Leave request submitted successfully!");
            submitLeaveApplication(); 
        }
    };

    return (
        <div>
            <Header />
            <div className='container mt-5'>
                <div className="card bg-light border-0 rounded-5 shadow-lg">
                    <div className="card-body px-5 py-4">
                        <h2 className="card-title text-center mb-4">Leave Request Form</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <h5>Type of Leave</h5>
                                {errors.reasons && <div className="text-danger mb-2">{errors.reasons}</div>}
                                <div className="row">
                                    {reasonsList.map((reason, index) => (
                                        <div className="col-md-3 mb-2" key={index}>
                                            <div className="form-check">
                                                <input
                                                    type="checkbox"
                                                    className="form-check-input"
                                                    id={`reason${index}`}
                                                    value={reason}
                                                    onChange={handleCheckboxChange}
                                                />
                                                <label className="form-check-label" htmlFor={`reason${index}`}>
                                                    {reason}
                                                </label>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className='row mb-3'>
                                <div className='col-md-3'>
                                    <label htmlFor="leaveReason" className="form-label">Reason for Leave</label>
                                </div>
                                <div className='col-md-9'>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.leaveReason ? 'is-invalid' : ''}`}
                                        id="leaveReason"
                                        value={formData.leaveReason}
                                        onChange={handleChange}
                                    />
                                    {errors.leaveReason && <div className="invalid-feedback">{errors.leaveReason}</div>}
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-md-4">
                                    <label htmlFor="leaveDate" className="form-label">Leave Date</label>
                                    <input
                                        type="date"
                                        className={`form-control ${errors.leaveDate ? 'is-invalid' : ''}`}
                                        id="leaveDate"
                                        value={formData.leaveDate}
                                        onChange={handleChange}
                                    />
                                    {errors.leaveDate && <div className="invalid-feedback">{errors.leaveDate}</div>}
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="returnDate" className="form-label">Return Date</label>
                                    <input
                                        type="date"
                                        className={`form-control ${errors.returnDate ? 'is-invalid' : ''}`}
                                        id="returnDate"
                                        value={formData.returnDate}
                                        onChange={handleChange}
                                    />
                                    {errors.returnDate && <div className="invalid-feedback">{errors.returnDate}</div>}
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="totalDays" className="form-label">Total Days Requested</label>
                                    <input
                                        type="number"
                                        className={`form-control ${errors.totalDays ? 'is-invalid' : ''}`}
                                        id="totalDays"
                                        value={formData.totalDays}
                                        onChange={handleChange}
                                    />
                                    {errors.totalDays && <div className="invalid-feedback">{errors.totalDays}</div>}
                                </div>
                            </div>

                            <div className="text-center mt-4">
                                <button type="submit" className="btn btn-primary px-5">Send Request</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeaveRequest;
