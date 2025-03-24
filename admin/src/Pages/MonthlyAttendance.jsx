import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import ProfileImg from "../assets/images/pro-img.png";

const MonthlyAttendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const getDaysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
  };

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);

  const fetchAttendanceData = () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`http://localhost:4000/api/attendance?month=${currentMonth}&year=${currentYear}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        const processedData = preprocessAttendanceData(data, daysInMonth);
        setAttendanceData(processedData);
      })
      .catch((error) => console.error("Error fetching attendance data:", error));
  };

  const preprocessAttendanceData = (data, daysInMonth) => {
    const userMap = {};
    const today = new Date();

    data.forEach((dayRecord) => {
      const date = new Date(dayRecord._id).getDate(); // Get the day of the month
      dayRecord.records.forEach((record) => {
        const { user_id, user_name, status } = record;

        if (!userMap[user_id]) {
          userMap[user_id] = {
            name: user_name,
            attendance: Array(daysInMonth).fill(""), // Default to blank for all days
          };
        }

        userMap[user_id].attendance[date - 1] = status; // Set status for the specific day
      });
    });

    // Ensure dates after the current date remain blank
    Object.values(userMap).forEach((user) => {
      const currentDay = today.getDate();
      if (today.getMonth() + 1 === currentMonth && today.getFullYear() === currentYear) {
        for (let i = currentDay; i < daysInMonth; i++) {
          user.attendance[i] = ""; // Keep dates after today blank
        }
      }
    });

    return Object.values(userMap);
  };

  useEffect(() => {
    fetchAttendanceData();
  }, [currentMonth, currentYear]);

  const handlePreviousMonth = () => {
    if (currentMonth === 1) {
      setCurrentMonth(12);
      setCurrentYear((prevYear) => prevYear - 1);
    } else {
      setCurrentMonth((prevMonth) => prevMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 12) {
      setCurrentMonth(1);
      setCurrentYear((prevYear) => prevYear + 1);
    } else {
      setCurrentMonth((prevMonth) => prevMonth + 1);
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
              <div className="card-header pt-3 d-block d-lg-flex justify-content-between bg-transparent border-bottom-0">
                <h4 className="mb-3 mb-lg-0 fw-bold">Monthly Attendance</h4>
                <div className="d-flex justify-content-between align-items-center">
                  <button
                    className="btn btn-warning rounded-pill"
                    onClick={handlePreviousMonth}
                  >
                    <i className="fa-solid fa-arrow-left"></i>
                  </button>
                  <h4 className="mx-2 mb-0">
                    {new Date(currentYear, currentMonth - 1).toLocaleString("default", {
                      month: "long",
                    })}{" "}
                    {currentYear}
                  </h4>
                  <button
                    className="btn btn-warning rounded-pill"
                    onClick={handleNextMonth}
                  >
                    <i className="fa-solid fa-arrow-right"></i>
                  </button>
                </div>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover mb-0 rounded-4 overflow-hidden">
                    <thead>
                      <tr className="table-warning">
                        <th scope="col">#</th>
                        <th scope="col">Employee</th>
                        {Array.from({ length: daysInMonth }, (_, i) => (
                          <th key={i + 1}>{i + 1}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {attendanceData.map((employee, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>
                            <img
                              src={ProfileImg}
                              alt=""
                              className="tbl-empImg"
                            />
                            {employee.name}
                          </td>
                          {employee.attendance.map((status, i) => (
                            <td
                              key={i}
                              className={
                                status === "Present"
                                  ? "text-success"
                                  : status === "Half Day"
                                    ? "text-warning"
                                    : status === "Absent"
                                      ? "text-danger"
                                      : ""
                              }
                            >
                              {status === "Present"
                                ? "✔️"
                                : status === "WorkFromHome"
                                  ? "🔶"
                                  : status === "Absent"
                                    ? "❌"
                                    : ""}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthlyAttendance;
