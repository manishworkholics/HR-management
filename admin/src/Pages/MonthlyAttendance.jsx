import React, { useState, useEffect, useCallback } from "react";
import Header from "../Components/Header";
import ProfileImg from "../assets/images/pro-img.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MonthlyAttendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [loading, setLoading] = useState(false); // Loading state

  const getDaysInMonth = (month, year) => new Date(year, month, 0).getDate();
  const daysInMonth = getDaysInMonth(currentMonth, currentYear);

  const fetchAttendanceData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://206.189.130.102:5050/api/attendance`);
      const data = await response.json();
      console.log("API Response:", data); // Debugging purpose
      setAttendanceData(preprocessAttendanceData(data, daysInMonth));
    } catch (error) {
      console.error("Error fetching attendance data:", error);
    } finally {
      setLoading(false);
    }
  }, [currentMonth, currentYear]);// eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    fetchAttendanceData();
  }, [fetchAttendanceData]);

  const preprocessAttendanceData = (data, daysInMonth) => {
    const userMap = {};

    data.forEach((dayRecord) => {
      dayRecord.records.forEach(({ user_id, user_name }) => {
        if (!userMap[user_id]) {
          userMap[user_id] = {
            name: user_name,
            attendance: Array(daysInMonth).fill(""),
          };
        }
      });
    });

    data.forEach((dayRecord) => {
      const recordDate = new Date(dayRecord._id);
      const month = recordDate.getMonth() + 1;
      const year = recordDate.getFullYear();
      const date = recordDate.getDate();

      if (month === currentMonth && year === currentYear) {
        dayRecord.records.forEach(({ user_id, status }) => {
          if (userMap[user_id]) {
            userMap[user_id].attendance[date - 1] = status;
          }
        });
      }
    });

    return Object.values(userMap);
  };

  const handleMonthChange = (increment) => {
    setCurrentMonth((prevMonth) => {
      let newMonth = prevMonth + increment;
      let newYear = currentYear;

      if (newMonth < 1) {
        newMonth = 12;
        newYear -= 1;
      } else if (newMonth > 12) {
        newMonth = 1;
        newYear += 1;
      }

      setCurrentYear(newYear);
      return newMonth;
    });
  };

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
              <div className="card-header pt-3 d-block d-lg-flex justify-content-between bg-transparent border-bottom-0">
                <div className="">
                  <h4 className="mb-3 mb-lg-2 fw-bold">Monthly Attendance</h4>
                  <div className="d-block d-lg-flex">
                    <h6 className="me-3">✔️ Full Day Present</h6>
                    <h6 className="me-3">🔶 Work from Home</h6>
                    <h6 className="me-3">🔻 Halfday</h6>
                    <h6 className="me-3">❌ Full Day Absence</h6>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <button className="btn btn-warning rounded-pill" onClick={() => handleMonthChange(-1)}>
                    <i className="fa-solid fa-arrow-left"></i>
                  </button>
                  <h4 className="mx-2 mb-0">
                    {new Date(currentYear, currentMonth - 1).toLocaleString("default", { month: "long" })} {currentYear}
                  </h4>
                  <button className="btn btn-warning rounded-pill" onClick={() => handleMonthChange(1)}>
                    <i className="fa-solid fa-arrow-right"></i>
                  </button>
                </div>
              </div>
              <div className="card-body">
                {loading ? (
                  <div className="text-center py-4">Loading...</div>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-hover mb-0 rounded-4 overflow-hidden">
                      <thead>
                        <tr className="table-warning">
                          <th>#</th>
                          <th>Employee</th>
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
                              {/* <img src={ProfileImg} alt="" className="tbl-empImg" /> */}
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
                                    : status === "HalfDay"
                                      ? "🔻"
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
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthlyAttendance;
