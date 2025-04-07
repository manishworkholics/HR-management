import React from "react";

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
                margin: "auto",
                padding: "30px",
                border: "1px solid #ccc",
                fontFamily: "Arial, sans-serif",
                marginBottom: "30px",
            }}
        >
            {/* Header - hidden during print */}
            <div className="d-print-none" style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
                <div>
                    <div style={{ fontSize: "24px", fontWeight: "bold" }}>India Payroll Inc</div>
                    <div>Chennai, India</div>
                </div>
                <div style={{ textAlign: "right" }}>
                    <div>
                        <strong>Payslip</strong> for the month of {new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}
                    </div>
                </div>
            </div>

            {/* Employee Details */}
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
                <div>
                    <p><strong>Employee Name:</strong> {employee.name || "NA"}</p>
                    <p><strong>Job Title:</strong> {employee.role || "NA"}</p>
                    <p><strong>Date of Joining:</strong> Jan 1, 2021</p>
                </div>
                <div style={{ textAlign: "right" }}>
                    <p><strong>Pay Period:</strong> {startDate} - {endDate}</p>
                    <p><strong>Pay Date:</strong> {new Date().toLocaleDateString()}</p>
                    <p><strong>Net Pay:</strong> ₹{totalSalary}</p>
                    <p>Paid Days: {employee.total_present_days || 0} | LOP: 0</p>
                </div>
            </div>

            {/* Earnings and Deductions */}
            <div style={{ display: "flex", justifyContent: "space-between", gap: "20px", marginBottom: "20px" }}>
                {/* Earnings */}
                <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: "16px" }}>Earnings</h3>
                    <table style={{ width: "100%" }}>
                        <tbody>
                            <tr><td>Basic</td><td style={{ textAlign: "right" }}>₹{totalSalary}</td></tr>
                            <tr><td>House Rent Allowance</td><td style={{ textAlign: "right" }}>₹5,000</td></tr>
                            <tr><td>Conveyance Allowance</td><td style={{ textAlign: "right" }}>₹800</td></tr>
                            <tr><td>Fixed Medical Allowance</td><td style={{ textAlign: "right" }}>₹500</td></tr>
                            <tr><td>Fixed Allowance</td><td style={{ textAlign: "right" }}>₹1,486</td></tr>
                            <tr style={{ borderTop: "1px solid #ccc", fontWeight: "bold" }}>
                                <td>Gross Earning</td>
                                <td style={{ textAlign: "right" }}>₹17,786</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Deductions */}
                <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: "16px" }}>Deductions</h3>
                    <table style={{ width: "100%" }}>
                        <tbody>
                            <tr><td>EPF Contribution</td><td style={{ textAlign: "right" }}>₹1,534</td></tr>
                            <tr><td>ESI Contribution</td><td style={{ textAlign: "right" }}>₹127</td></tr>
                            <tr style={{ borderTop: "1px solid #ccc", fontWeight: "bold" }}>
                                <td>Total Deductions</td>
                                <td style={{ textAlign: "right" }}>₹1,661</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Net Pay */}
            <div style={{ borderTop: "1px solid #ccc", paddingTop: "10px" }}>
                <div style={{ fontSize: "18px", fontWeight: "bold" }}>Total Net Payable: ₹{totalSalary}</div>
                <div>*Total net = Gross earning - Total deductions + reimbursements</div>
            </div>

            {/* Print Button - hidden during print */}
            <div className="d-print-none" style={{ marginTop: "20px", textAlign: "center" }}>
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
