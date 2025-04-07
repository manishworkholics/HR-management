import React, { useState, useEffect } from "react";
import Header from "../Components/Header";


const Attendance = () => {
    const [currentDate, setCurrentDate] = useState(new Date().toISOString().split("T")[0]);
    const [attendanceRecords, setAttendanceRecords] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch attendance for selected date
    const fetchAttendanceData = (date) => {
        setLoading(true);
        fetch(`http://206.189.130.102:5050/api/attendance/get-attendance-by-date?date=${date}`)
            .then((response) => response.json())
            .then((data) => {
                if (data) {
                    setAttendanceRecords(data?.data || []);
                } else {
                    setAttendanceRecords([]);
                }
            })
            .catch((error) => console.error("Error fetching attendance data:", error))
            .finally(() => setLoading(false));
    };

    // Handle dropdown change
    const handleStatusChange = (userId, newStatus) => {
        setAttendanceRecords((prevRecords) =>
            prevRecords.map((record) =>
                record.user_id === userId ? { ...record, status: newStatus } : record
            )
        );
    };

    // Bulk update all records
    const handleBulkUpdate = () => {
        const bulkData = {
            attendanceRecords: attendanceRecords.map((record) => ({
                user_id: record.user_id,
                date: currentDate,
                user_entry_time: record.user_entry_time || "10:00 AM",
                user_exit_time: record.user_exit_time || "07:00 PM",
                status: record.status,
            })),
        };

        fetch("http://206.189.130.102:5050/api/attendance/bulk", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(bulkData),
        })
            .then((response) => {
                if (!response.ok) {
                    return response.json().then((err) => {
                        throw new Error(err.message || "Bulk update failed");
                    });
                }
                return response.json();
            })
            .then((result) => {
                alert("Attendance records updated successfully.");
                console.log("Bulk update successful:", result);
            })
            .catch((error) => {
                alert("Error updating attendance records: " + error.message);
                console.error("Bulk update error:", error);
            });
    };

    useEffect(() => {
        fetchAttendanceData(currentDate);
    }, [currentDate]);

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
                                {loading ? (
                                    <div className="text-center">
                                        <div className="spinner-border text-dark" role="status"></div>
                                    </div>
                                ) : (
                                    <div className="table-responsive">
                                        <table className="table table-hover mb-0 rounded-4 overflow-hidden">
                                            <thead>
                                                <tr className="table-warning">
                                                    <th>#</th>
                                                    <th>User Name</th>
                                                    <th>Entry Time</th>
                                                    <th>Exit Time</th>
                                                    <th>Status</th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                {attendanceRecords.length > 0 ? (
                                                    attendanceRecords.map((record, index) => (
                                                        <tr key={record.user_id}>
                                                            <th>{index + 1}</th>
                                                            <td>

                                                                {record?.user_id?.name}
                                                            </td>
                                                            <td>{record?.user_entry_time}</td>
                                                            <td>{record?.user_exit_time}</td>
                                                            <td>
                                                                <select
                                                                    className="form-select"
                                                                    value={record?.status}
                                                                    onChange={(e) =>
                                                                        handleStatusChange(record.user_id, e.target.value)
                                                                    }
                                                                >
                                                                    <option value="Present">Present</option>
                                                                    <option value="Absent">Absent</option>
                                                                    <option value="WorkFromHome">Work From Home</option>
                                                                    <option value="HalfDay">Half Day</option>
                                                                </select>
                                                            </td>

                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="6" className="text-center">
                                                            No attendance records found for {currentDate}.
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                                <div className="text-end mt-4">
                                    <button
                                        className="btn btn-success rounded-5"
                                        onClick={handleBulkUpdate}
                                    >
                                        Update Attendance (Bulk)
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
