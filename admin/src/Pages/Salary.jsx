import React, { useState, useEffect, useRef } from "react";
import Header from "../Components/Header";
import Payslip from "../Components/SalarySlip";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const Salary = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showPayslip, setShowPayslip] = useState(false);

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
    }, 300);
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

  const handleUploadClick = async (employee) => {
    setSelectedEmployee(employee);
    setShowPayslip(true);

    setTimeout(async () => {
      const payslipElement = document.getElementById("payslip-to-upload");
      if (!payslipElement) {
        alert("Payslip not found!");
        return;
      }

      try {
        // Capture the payslip DOM as canvas
        const canvas = await html2canvas(payslipElement);
        const imgData = canvas.toDataURL("image/png");

        // Generate PDF using jsPDF
        const pdf = new jsPDF();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

        // Convert PDF to blob
        const pdfBlob = pdf.output("blob");
        const pdfFile = new File([pdfBlob], `salary-slip-${employee.id}.pdf`, {
          type: "application/pdf",
        });

        console.log("PDF Blob:", pdfBlob);
        console.log("PDF File:", pdfFile);

        // Prepare FormData
        const formData = new FormData();
        formData.append("file", pdfFile); // <-- Change to "image" if needed

        // Upload to API
        const response = await fetch(
          `http://206.189.130.102:5050/api/v1/uploading?id=${employee.id}`,
          {
            method: "POST",
            body: formData,
          }
        );

        console.log("Raw Response:", response);

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Upload failed:", errorText);
          alert("Upload failed: " + response.statusText);
          return;
        }

        const result = await response.json();
        console.log("Upload response:", result);
        alert("Salary slip uploaded successfully.");
      } catch (error) {
        console.error("Upload error:", error);
        alert("Failed to upload salary slip.");
      } finally {
        setShowPayslip(false);
      }
    }, 500);
  };



  if (error) {
    return <div className="text-center text-danger">{error}</div>;
  }

  return (
    <div className="container-fluid employee-page">
      <div className="d-print-none">
        <Header />
      </div>
      <div className="px-lg-5 px-0">

        {showPayslip && selectedEmployee && (
          <div
            className="d-none d-print-block"
            id="payslip-to-upload"
            style={{ padding: "20px", backgroundColor: "white" }}
          >
            <Payslip employee={selectedEmployee} startDate={startDate} endDate={endDate} />
          </div>
        )}


        {/* Everything below will be hidden when printing */}
        <div className="d-print-none">
          <div className="row">
            <div className="col-12 px-4">
              <h1 className="my-4">Salary</h1>
            </div>
            <div className="col-md-12 mb-4">
              <div className="card bg-ffffff94 border-0 rounded-5 h-100">
                <div className="card-header pt-3 d-block d-lg-flex justify-content-between align-items-center bg-transparent border-bottom-0">
                  <h4 className="mb-3 fw-bold">Salary List</h4>
                  <form className="row g-3" onSubmit={handleSubmit}>
                    {/* Add your startDate and endDate fields here */}
                    <div className="col-auto">
                      <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="form-control"
                      />
                    </div>
                    <div className="col-auto">
                      <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="form-control"
                      />
                    </div>
                    <div className="col-auto">
                      <button type="submit" className="btn btn-dark px-3 rounded-pill">
                        Filter
                      </button>
                    </div>
                  </form>
                </div>

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
                              <tr key={index}>
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
                                    className="btn btn-secondary rounded-5 me-3"
                                    onClick={() => handlePrint(employee)}
                                  >
                                    Print <i className="fa-solid fa-print ms-1"></i>
                                  </button>
                                  <button
                                    className="btn btn-primary rounded-5"
                                    onClick={() => handleUploadClick(employee)}
                                  >
                                    Upload <i className="fa-solid fa-upload ms-1"></i>
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
    </div>
  );
};

export default Salary;
