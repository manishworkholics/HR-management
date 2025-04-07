// import React, { useState, useEffect } from "react";
// import Header from "../Components/Header";
// import ProfileImg from '../assets/images/pro-img.png'

// const Attendance = () => {
//     const [currentDate, setCurrentDate] = useState(new Date().toISOString().split("T")[0]);
//     const [attendanceRecords, setAttendanceRecords] = useState([]);
//     const [loading, setLoading] = useState(false);

//     // Function to fetch attendance data for a specific date
//     const fetchAttendanceData = (date) => {
//         setLoading(true);
//         fetch(`http://localhost:4000/api/attendance/get-attendance-by-date?date=${date}`)
//             .then((response) => response.json())
//             .then((data) => {
//                 if (data && data.length > 0) {
//                     setAttendanceRecords(data[0].records || []);
//                 } else {
//                     setAttendanceRecords([]); // Clear records if no data
//                 }
//             })
//             .catch((error) => console.error("Error fetching attendance data:", error))
//             .finally(() => {
//                 setLoading(false);
//             })
//     };

//     // Function to handle status change
//     const handleStatusChange = (userId, newStatus) => {
//         setAttendanceRecords((prevRecords) =>
//             prevRecords.map((record) =>
//                 record.user_id === userId ? { ...record, status: newStatus } : record
//             )
//         );
//     };

//     // Function to handle bulk update
//     const handleBulkUpdate = () => {
//         const bulkData = {
//             attendanceRecords: attendanceRecords.map((record) => ({
//                 user_id: record.user_id,
//                 date: currentDate,
//                 user_entry_time: record.user_entry_time || "09:00 AM", 
//                 user_exit_time: record.user_exit_time || "06:00 PM", 
//                 status: record.status,
//             })),
//         };

//         console.log("Bulk data being sent:", bulkData);

//         const requestOptions = {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(bulkData),
//         };

//         fetch("http://localhost:4000/api/attendance/bulk", requestOptions)
//             .then((response) => {
//                 if (!response.ok) {
//                     return response.json().then((err) => {
//                         throw new Error(err.message || "Bulk update failed");
//                     });
//                 }
//                 return response.json();
//             })
//             .then((result) => {
//                 console.log("Bulk update successful:", result);
//                 alert("Attendance records updated successfully.");
//             })
//             .catch((error) => {
//                 console.error("Error updating attendance records:", error);
//                 alert("Error updating attendance records: " + error.message);
//             });
//     };

//     useEffect(() => {
//         fetchAttendanceData(currentDate);
//     }, [currentDate]);

//     return (
//         <div className="container-fluid attendance-page">
//             <Header />
//             <div className="px-lg-5 px-0">
//                 <div className="row">
//                     <div className="col-12 px-4">
//                         <h1 className="my-4">Attendance</h1>
//                     </div>
//                     <div className="col-md-12 mb-4">
//                         <div className="card bg-ffffff94 border-0 rounded-5 h-100">
//                             <div className="card-header pt-3 d-flex justify-content-between bg-transparent border-bottom-0">
//                                 <h4 className="mb-0 fw-bold">Attendance</h4>
//                                 <div>
//                                     <input
//                                         type="date"
//                                         value={currentDate}
//                                         onChange={(e) => setCurrentDate(e.target.value)}
//                                     />
//                                 </div>
//                             </div>
//                             <div className="card-body">
//                                 {loading ? (
//                                     <div className="text-center">
//                                         <div className="spinner-border text-dark"
//                                             role='status'></div>
//                                     </div>
//                                 ) : (
//                                     <div className="table-responsive">
//                                         <table className="table table-hover mb-0 rounded-4 overflow-hidden">
//                                             <thead>
//                                                 <tr className="table-warning">
//                                                     <th scope="col">#</th>
//                                                     <th scope="col">User Name</th>
//                                                     <th scope="col">Entry Time</th>
//                                                     <th scope="col">Exit Time</th>
//                                                     <th scope="col">Status</th>
//                                                 </tr>
//                                             </thead>
//                                             <tbody>
//                                                 {attendanceRecords.length > 0 ? (
//                                                     attendanceRecords.map((record, index) => (
//                                                         <tr key={record.user_id}>
//                                                             <th scope="row">{index + 1}</th>
//                                                             <td>
//                                                                 <img src={ProfileImg} alt="" className="tbl-empImg" />
//                                                                 {record.user_name}
//                                                             </td>
//                                                             <td>{record.user_entry_time}</td>
//                                                             <td>{record.user_exit_time}</td>
//                                                             <td>
//                                                                 <select
//                                                                     className="form-select"
//                                                                     value={record.status}
//                                                                     onChange={(e) =>
//                                                                         handleStatusChange(record.user_id, e.target.value)
//                                                                     }
//                                                                 >
//                                                                     <option value="Present">Present</option>
//                                                                     <option value="Absent">Absent</option>
//                                                                     <option value="WorkFromHome">Work From Home</option>
//                                                                 </select>
//                                                             </td>
//                                                         </tr>
//                                                     ))
//                                                 ) : (
//                                                     <tr>
//                                                         <td colSpan="5" className="text-center">
//                                                             No attendance records found for {currentDate}.
//                                                         </td>
//                                                     </tr>
//                                                 )}
//                                             </tbody>
//                                         </table>
//                                     </div>
//                                 )}
//                                 <div className="text-end mt-4">
//                                     <button
//                                         className="btn btn-success rounded-5"
//                                         onClick={handleBulkUpdate}
//                                     >
//                                         Update Attendance
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Attendance;

import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import ProfileImg from "../assets/images/pro-img.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Attendance = () => {
    const [currentDate, setCurrentDate] = useState(new Date().toISOString().split("T")[0]);
    const [attendanceRecords, setAttendanceRecords] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch attendance for selected date
    const fetchAttendanceData = (date) => {
        setLoading(true);
        fetch(`http://localhost:4000/api/attendance/get-attendance-by-date?date=${date}`)
            .then((response) => response.json())
            .then((data) => {
                if (data && data.length > 0) {
                    setAttendanceRecords(data[0].records || []);
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
                user_entry_time: record.user_entry_time || "09:00 AM",
                user_exit_time: record.user_exit_time || "06:00 PM",
                status: record.status,
            })),
        };

        fetch("http://localhost:4000/api/attendance/bulk", {
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

    // Single user update
    const handleSingleUpdate = (userId, status) => {
        const data = {
            status: status,
            date: currentDate, // include if your API expects it
        };

        fetch(`http://localhost:4000/api/attendance/update-attendance-single/${userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to update attendance.");
                }
                return response.json();
            })
            .then((result) => {
                alert("Attendance updated successfully!");
                console.log("Single update success:", result);
            })
            .catch((error) => {
                alert("Error updating attendance: " + error.message);
                console.error("Single update error:", error);
            });
    };

    useEffect(() => {
        fetchAttendanceData(currentDate);
    }, [currentDate]);

    return (
        <div className="container-fluid attendance-page">
            <ToastContainer position="top-right" autoClose={3000} />
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
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {attendanceRecords?.data?.length > 0 ? (
                                                    attendanceRecords?.data?.map((record, index) => (
                                                        <tr key={record.user_id}>
                                                            <th>{index + 1}</th>
                                                            <td>
                                                                <img src={ProfileImg} alt="Profile" className="tbl-empImg me-2" />
                                                                {record.user_id.name}
                                                            </td>
                                                            <td>{record.user_entry_time}</td>
                                                            <td>{record.user_exit_time}</td>
                                                            <td>
                                                                <select
                                                                    className="form-select"
                                                                    value={record.status}
                                                                    onChange={(e) =>
                                                                        handleStatusChange(record.user_id, e.target.value)
                                                                    }
                                                                >
                                                                    <option value="Present">Present</option>
                                                                    <option value="Absent">Absent</option>
                                                                    <option value="WorkFromHome">Work From Home</option>
                                                                </select>
                                                            </td>
                                                            <td>
                                                                <button
                                                                    className="btn btn-sm btn-primary"
                                                                    onClick={() =>
                                                                        handleSingleUpdate(record.user_id, record.status)
                                                                    }
                                                                >
                                                                    Edit
                                                                </button>
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
