import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import callAPI from "./Common_Method/api";

const EditAttendance = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  console.log("Fetching attendance for date:", selectedDate);
  const [formData, setFormData] = useState({
    user_entry_time: "",
    user_exit_time: "",
    status: "Present",
  });

  const fetchAllUsers = async () => {
    try {
      const response = await callAPI.get(`/users/`);
      if (response?.data) {
        setAllUsers(response?.data || [])
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  const fetchAttendanceUsers = async () => {
    if (!selectedDate) return;

    console.log("Fetching attendance for date:", selectedDate);

    try {
      const response = await callAPI.get(`/attendance/get-attendance-by-date?date=${selectedDate}`);
      if (response?.data?.records) {
        setAttendanceRecords(response.data.records);
      } else {
        console.warn("No records found or response format changed");
        setAttendanceRecords([]);
      }
    } catch (err) {
      console.error("Error fetching attendance records:", err);
      setAttendanceRecords([]);
    }
  };


  const fetchUserAttendance = () => {
    const userAttendance = attendanceRecords.find(
      (a) => a.user_id?._id === selectedUser
    );

    if (userAttendance) {
      setFormData({
        user_entry_time: userAttendance.user_entry_time || "",
        user_exit_time: userAttendance.user_exit_time || "",
        status: userAttendance.status || "Present",
      });
    } else {
      // No attendance record for this user on selected date
      // Allow user to manually fill form
      setFormData({
        user_entry_time: "",
        user_exit_time: "",
        status: "Present",
      });
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      attendanceRecords: [
        {
          user_id: selectedUser,
          date: selectedDate,
          user_entry_time: formData.user_entry_time || "10:00 AM",
          user_exit_time: formData.user_exit_time || "07:00 PM",
          status: formData.status,
        },
      ],
    };

    try {
      const response = await callAPI.post("/attendance/bulk", payload);
      if (response?.data?.success) {
        alert("Attendance updated successfully!");
        fetchAttendanceUsers(); // Refresh data
      } else {
        alert(response?.data?.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Submission Error:", error);
      alert("Failed to update attendance.");
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);


  useEffect(() => {
    fetchAttendanceUsers();
  }, [selectedDate]);

  useEffect(() => {
    if (selectedUser) {
      fetchUserAttendance();
    }
  }, [selectedUser, attendanceRecords]);


  return (
    <div className="container-fluid">
      <Header />
      <div className="container my-4">
        <h2>Edit Attendance</h2>
        <form onSubmit={handleSubmit} className="card p-4 rounded-4 shadow-sm">
          <div className="mb-3">
            <label className="form-label">Select User</label>
            <select
              className="form-select"
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              required
            >
              <option value="">-- Select Employee --</option>

              {allUsers?.length > 0 ? (
                allUsers?.map((user) => (
                  <option key={user?._id} value={user?._id}>
                    {user?.name || user?.username || "No Name"}
                  </option>
                ))
              ) : (
                <option disabled>Loading or No users found</option>
              )}

            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Select Date</label>
            <input
              type="date"
              className="form-control"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Entry Time</label>
            <input
              type="time"
              className="form-control"
              name="user_entry_time"
              value={formData.user_entry_time}
              onChange={(e) => setFormData({ ...formData, user_entry_time: e.target.value })}
              placeholder="e.g., 10:00 AM"
            />

          </div>

          <div className="mb-3">
            <label className="form-label">Exit Time</label>
            <input
              type="time"
              className="form-control"
              name="user_exit_time"
              value={formData.user_exit_time}
              onChange={(e) => setFormData({ ...formData, user_exit_time: e.target.value })}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Status</label>
            <select
              className="form-select"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
              <option value="WorkFromHome">Work From Home</option>
              <option value="HalfDay">Half Day</option>
            </select>
          </div>

          <button className="btn btnColor" type="submit">
            Save Attendance
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditAttendance;
