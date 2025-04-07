import React from "react";

const Payslip = () => {
    return (
        <div
            style={{
                background: "#fff",
                width: "100%",
                margin: "auto",
                padding: "30px",
                border: "1px solid #ccc",
                fontFamily: "Arial, sans-serif",
            }}
        >
            {/* Header */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "20px",
                }}
            >
                <div>
                    <div style={{ fontSize: "24px", fontWeight: "bold" }}>India Payroll Inc</div>
                    <div>Chennai, India</div>
                </div>
                <div style={{ textAlign: "right" }}>
                    <div>
                        <strong>Payslip</strong> for the month of June, 2023
                    </div>
                </div>
            </div>

            {/* Employee Details */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "20px",
                }}
            >
                <div>
                    <p style={{ margin: "5px 0" }}>
                        <strong>Employee Name:</strong> Arun K (EMP6)
                    </p>
                    <p style={{ margin: "5px 0" }}>
                        <strong>Job Title:</strong> Executive
                    </p>
                    <p style={{ margin: "5px 0" }}>
                        <strong>Date of Joining:</strong> Jan 1, 2021
                    </p>
                </div>
                <div style={{ textAlign: "right" }}>
                    <p style={{ margin: "5px 0" }}>
                        <strong>Pay Period:</strong> Jun 1 - Jun 30, 2023
                    </p>
                    <p style={{ margin: "5px 0" }}>
                        <strong>Pay Date:</strong> Jul 5, 2023
                    </p>
                    <p style={{ margin: "5px 0" }}>
                        <strong>Net Pay:</strong> ₹16,125
                    </p>
                    <p style={{ margin: "5px 0" }}>Paid Days: 30 | LOP: 0</p>
                </div>
            </div>

            {/* Earnings and Deductions */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "20px",
                    marginBottom: "20px",
                }}
            >
                {/* Earnings */}
                <div style={{ flex: 1 }}>
                    <h3 style={{ marginBottom: "10px", fontSize: "16px", fontWeight: "bold" }}>
                        Earnings
                    </h3>
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <tbody>
                            <tr>
                                <td>Basic</td>
                                <td style={{ textAlign: "right" }}>₹10,000</td>
                            </tr>
                            <tr>
                                <td>House Rent Allowance</td>
                                <td style={{ textAlign: "right" }}>₹5,000</td>
                            </tr>
                            <tr>
                                <td>Conveyance Allowance</td>
                                <td style={{ textAlign: "right" }}>₹800</td>
                            </tr>
                            <tr>
                                <td>Fixed Medical Allowance</td>
                                <td style={{ textAlign: "right" }}>₹500</td>
                            </tr>
                            <tr>
                                <td>Fixed Allowance</td>
                                <td style={{ textAlign: "right" }}>₹1,486</td>
                            </tr>
                            <tr>
                                <td style={{ fontWeight: "bold", borderTop: "1px solid #ccc" }}>
                                    Gross Earning
                                </td>
                                <td
                                    style={{
                                        textAlign: "right",
                                        fontWeight: "bold",
                                        borderTop: "1px solid #ccc",
                                    }}
                                >
                                    ₹17,786
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Deductions */}
                <div style={{ flex: 1 }}>
                    <h3 style={{ marginBottom: "10px", fontSize: "16px", fontWeight: "bold" }}>
                        Deductions
                    </h3>
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <tbody>
                            <tr>
                                <td>EPF Contribution</td>
                                <td style={{ textAlign: "right" }}>₹1,534</td>
                            </tr>
                            <tr>
                                <td>ESI Contribution</td>
                                <td style={{ textAlign: "right" }}>₹127</td>
                            </tr>
                            <tr>
                                <td style={{ fontWeight: "bold", borderTop: "1px solid #ccc" }}>
                                    Total Deductions
                                </td>
                                <td
                                    style={{
                                        textAlign: "right",
                                        fontWeight: "bold",
                                        borderTop: "1px solid #ccc",
                                    }}
                                >
                                    ₹1,661
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Net Pay */}
            <div style={{ borderTop: "1px solid #ccc", paddingTop: "10px" }}>
                <div style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "5px" }}>
                    Total Net Payable: ₹16,125
                </div>
                <div>*Total net = Gross earning - Total deductions + reimbursements</div>
            </div>

            {/* Print Button */}
            <div style={{ marginTop: "20px", textAlign: "center" }}>
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

