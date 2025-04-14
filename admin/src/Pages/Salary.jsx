import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import Payslip from "../Components/SalarySlip";
import html2pdf from "html2pdf.js";
import { useRef } from "react";
import ProfileImg from '../assets/images/pro-img.png'

const Salary = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showPayslip, setShowPayslip] = useState(false);
  const payslipRef = useRef();
  const [previewImage, setPreviewImage] = useState(null);

  const handlePreview = (imgUrl) => {
    setPreviewImage(imgUrl);
  };


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

  if (error) {
    return <div className="text-center text-danger">{error}</div>;
  }

  const handleUpload = async (employee) => {
    setSelectedEmployee(employee);
    setShowPayslip(true);

    setTimeout(async () => {
      const element = payslipRef.current;

      if (!element) return;

      const opt = {
        margin: 0,
        filename: `${employee.name || "salary-slip"}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      };

      try {
        // Generate PDF Blob
        const pdfBlob = await html2pdf().from(element).set(opt).outputPdf('blob');

        // Prepare FormData for uploading
        const formData = new FormData();
        formData.append("image", pdfBlob, `${employee.name || "salary-slip"}.pdf`);

        // Step 1: Upload PDF
        const uploadRes = await fetch("http://206.189.130.102:5050/api/v1/uploading", {
          method: "POST",
          body: formData,
          redirect: "follow",
        });

        const uploadResult = await uploadRes.json();
        const uploadedUrl = uploadResult?.file_url || uploadResult?.data?.url; // Adjust if response format is different

        if (!uploadedUrl) {
          throw new Error("Upload failed. No URL returned.");
        }

        console.log("PDF uploaded:", uploadedUrl);

        // Step 2: Submit slip URL to database
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const today = new Date().toISOString().split("T")[0]; // format: YYYY-MM-DD
        const payload = JSON.stringify({
          user_id: employee.user_id, // make sure this exists in your data
          date: today,
          slip_url: uploadedUrl,
        });

        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: payload,
          redirect: "follow",
        };

        const saveRes = await fetch("http://206.189.130.102:5050/api/salaries/create-salary", requestOptions);
        const saveResult = await saveRes.text();

        console.log("Salary record saved:", saveResult);
        alert("Payslip uploaded and saved successfully ✅");

      } catch (error) {
        console.error("Error during upload and save:", error);
        alert("Error uploading and saving payslip ❌");
      }
    }, 500);
  };



  return (
    <div className="container-fluid employee-page">
      <div className="d-print-none">
        <Header />
      </div>
      <div className="px-lg-5 px-0">

        {/* Show Payslip only during print */}
        {showPayslip && selectedEmployee && (
          <div className="d-none">
            <div ref={payslipRef}>
              <Payslip employee={selectedEmployee} startDate={startDate} endDate={endDate} />
            </div>
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
                                <td>
                                  <img
                                    src={employee.image || ProfileImg}
                                    alt=""
                                    className="tbl-empImg shadow"
                                    style={{ cursor: "pointer", width: "40px", height: "40px", objectFit: "cover", borderRadius: "50%" }}
                                    onClick={() => handlePreview(employee.image || ProfileImg)}
                                  />
                                  {employee.name}
                                </td>
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
                                    onClick={() => handleUpload(employee)}
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
      {/* Modal Image-Preview */}
      {previewImage && (
        <div
          className="modal fade show "
          style={{ display: "block", background: "rgba(0,0,0,0.6)" }}
          onClick={() => setPreviewImage(null)}
        >
          <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content" style={{ background: "rgba(0,0,0,0.8)" }}>
              <div className="modal-header border-0">
                <h5 className="modal-title text-white">Image Preview</h5>
                <button type="button" className="btn-close bg-white rounded-circle" onClick={() => setPreviewImage(null)}></button>
              </div>
              <div className="modal-body text-center">
                <img src={previewImage} alt="Preview" className="img-fluid rounded shadow" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Salary;
