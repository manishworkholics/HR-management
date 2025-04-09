import React from "react";
import Logo from '../assets/images/logo.png';

const Payslip = ({ employee, startDate, endDate }) => {
    if (!employee) return null;

    const totalSalary =
        employee.total_present_days && employee.wages_per_day
            ? employee.total_present_days * employee.wages_per_day
            : 0;

    return (
        <div
            style={{
                background: "#fff",
                width: "100%",
                maxWidth: "900px",
                margin: "auto",
                padding: "20px",
                border: "1px solid #ccc",
                fontFamily: "Arial, sans-serif",
                marginBottom: "30px",
                boxSizing: "border-box"
            }}
        >
            {/* Header */}
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start mb-4">
                <div>
                    <img src={Logo} alt="Logo" width="150" className="img-fluid" />
                </div>
                <div className="text-md-end text-start mt-3 mt-md-0">
                    <strong>Payslip</strong> for the month of{" "}
                    {new Date().toLocaleString("default", { month: "long", year: "numeric" })}
                </div>
            </div>

            {/* Employee Details */}
            <div className="d-flex flex-column flex-md-row justify-content-between mb-4">
                <div className="mb-3 mb-md-0">
                    <p className="mb-2"><strong>Employee Name:</strong> {employee.name || "NA"}</p>
                    <p className="mb-2"><strong>Job Title:</strong> {employee.role || "NA"}</p>
                    <p className="mb-2"><strong>Date of Joining:</strong> Jan 1, 2021</p>
                </div>
                <div className="text-md-end text-start">
                    <p className="mb-2"><strong>Pay Period:</strong> {startDate} - {endDate}</p>
                    <p className="mb-2"><strong>Pay Date:</strong> {new Date().toLocaleDateString()}</p>
                    <p className="mb-2"><strong>Net Pay:</strong> ₹{totalSalary}</p>
                    <p className="mb-2">Paid Days: {employee.total_present_days || 0} | LOP: 0</p>
                </div>
            </div>

            {/* Earnings and Deductions */}
            <div className="d-flex flex-column flex-md-row gap-3 mb-4">
                {/* Earnings */}
                <div className="flex-fill">
                    <h3 style={{ fontSize: "16px", background: "grey", color: "white", padding: "3px" }}>Earnings</h3>
                    <table className="table table-bordered">
                        <tbody>
                            <tr><td>Basic</td><td className="text-end">₹{totalSalary}</td></tr>
                            <tr><td>House Rent Allowance</td><td className="text-end">₹5,000</td></tr>
                            <tr><td>Conveyance Allowance</td><td className="text-end">₹800</td></tr>
                            <tr><td>Fixed Medical Allowance</td><td className="text-end">₹500</td></tr>
                            <tr><td>Fixed Allowance</td><td className="text-end">₹1,486</td></tr>
                            <tr className="fw-bold border-top">
                                <td>Gross Earning</td>
                                <td className="text-end">₹17,786</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Deductions */}
                <div className="flex-fill">
                    <h3 style={{ fontSize: "16px", background: "grey", color: "white", padding: "3px" }}>Deductions</h3>
                    <table className="table table-bordered">
                        <tbody>
                            <tr><td>EPF Contribution</td><td className="text-end">₹1,534</td></tr>
                            <tr><td>ESI Contribution</td><td className="text-end">₹127</td></tr>
                            <tr className="fw-bold border-top">
                                <td>Total Deductions</td>
                                <td className="text-end">₹1,661</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Net Pay */}
            <div className="border-top pt-3">
                <div style={{ fontSize: "18px", fontWeight: "bold" }}>Total Net Payable: ₹{totalSalary}</div>
                <div className="text-muted small">*Total net = Gross earning - Total deductions + reimbursements</div>
            </div>

            {/* Print Button */}
            <div className="d-print-none text-center mt-4">
                <button
                    onClick={() => window.print()}
                    style={{
                        backgroundColor: "#007bff",
                        color: "white",
                        padding: "10px 20px",
                        border: "none",
                        fontSize: "14px",
                        borderRadius: "4px",
                        cursor: "pointer",
                    }}
                >
                    Print Payslip
                </button>
            </div>
        </div>
    );
};

export default Payslip;
