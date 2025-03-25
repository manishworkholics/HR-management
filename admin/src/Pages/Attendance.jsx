import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import ProfileImg from "../assets/images/pro-img.png";

const Attendance = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [currentDate, setCurrentDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const sampleData = {
      attendanceRecords: [
        {
          user_id: "67dbeefc2a78456a8d26874a",
          date: "2024-03-17",
          user_entry_time: "09:00 AM",
          user_exit_time: "06:00 PM",
          status: "Present",
        },
      ],
    };
    setAttendanceRecords(sampleData.attendanceRecords);
  }, []);

  const handleStatusChange = (index, newStatus) => {
    const updatedRecords = [...attendanceRecords];
    updatedRecords[index].status = newStatus;
    setAttendanceRecords(updatedRecords);
  };

  const handleBulkUpdate = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await fetch("http://localhost:4000/api/attendance/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ attendanceRecords }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const updatedData = await response.json();
      setAttendanceRecords(updatedData.attendanceRecords);
    } catch (err) {
      console.error("Error updating attendance:", err.message);
      setError("Failed to update attendance. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid attendance-page">
      <Header />
      <div className="px-lg-5 px-0">
        <div className="row">
          <div className="col-12 px-4">
            <h1 className="my-4">Attendance</h1>
          </div>
          <div className="col-md-12 mb-4">
            <div className="card bg-ffffff94 border-0 rounded-5 h-100">
              <div className="card-header pt-3 d-flex justify-content-between bg-transparent border-bottom-0">
                <h4 className="mb-0 fw-bold">Attendance</h4>
                <div>
                  <input
                    type="date"
                    value={currentDate}
                    onChange={(e) => setCurrentDate(e.target.value)}
                  />
                </div>
              </div>
              <div className="card-body">
                {error && (
                  <div className="text-center text-danger mb-2">{error}</div>
                )}
                {loading && (
                  <div className="text-center mb-2">
                    <div className="spinner-border" role="status"></div>
                    <p>Updating attendance...</p>
                  </div>
                )}
                <div className="table-responsive">
                  <table className="table table-hover mb-0 rounded-4 overflow-hidden">
                    <thead>
                      <tr className="table-warning">
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">User Name</th>
                        <th scope="col">Job Title</th>
                        <th scope="col">Date</th>
                        <th scope="col">Punching</th>
                        <th scope="col">Punch Out</th>
                        <th scope="col">Attendance</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {attendanceRecords.length > 0 ? (
                        attendanceRecords.map((record, index) => (
                          <tr key={record.user_id}>
                            <th scope="row">{index + 1}</th>
                            <td>
                              <img
                                src={ProfileImg}
                                alt=""
                                className="tbl-empImg"
                              />
                              {"User Name"}
                            </td>
                            <td>{"username"}</td>
                            <td>{"Job Title"}</td>
                            <td>{record.date}</td>
                            <td>{record.user_entry_time}</td>
                            <td>{record.user_exit_time}</td>
                            <td>
                              <select
                                className="form-select"
                                value={record.status}
                                onChange={(e) =>
                                  handleStatusChange(index, e.target.value)
                                }
                              >
                                <option value="Present">Present</option>
                                <option value="Absent">Absent</option>
                                <option value="WFH">WFH</option>
                              </select>
                            </td>
                            <td>
                              <button
                                type="button"
                                className="btn btn-warning text-white rounded-5 me-3"
                              >
                                Edit
                                <span className="ms-2">
                                  <i className="fa-solid fa-user-pen"></i>
                                </span>
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="9" className="text-center">
                            No attendance records found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="mt-3 text-end">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleBulkUpdate}
                  >
                    Update Attendance in Bulk
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
