import React, { useState } from "react";
import '../assets/css/Calendar.css'

const Calendar = () => {

    const today = new Date();
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [currentYear, setCurrentYear] = useState(today.getFullYear());

    const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];

    // Get first and last day of the month
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const totalDaysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const totalDaysPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

    // Generate calendar days
    const generateCalendarDays = () => {
        let days = [];
        // Previous month’s last few days
        for (let i = firstDayOfMonth - 1; i >= 0; i--) {
            days.push({ date: totalDaysPrevMonth - i, disabled: true });
        }
        // Current month days
        for (let i = 1; i <= totalDaysInMonth; i++) {
            days.push({ date: i, today: i === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear() });
        }
        // Ensure total 42 cells (6 weeks)
        while (days.length % 7 !== 0) {
            days.push({ date: days.length - totalDaysInMonth - firstDayOfMonth + 1, disabled: true });
        }
        return days;
    };

    const handlePrevMonth = () => {
        setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1));
        setCurrentYear((prev) => (currentMonth === 0 ? prev - 1 : prev));
    };

    const handleNextMonth = () => {
        setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1));
        setCurrentYear((prev) => (currentMonth === 11 ? prev + 1 : prev));
    };

    return (
        <>
            <div className="calendar-main">
                <div className="calendar-month block">
                    <div className="arrow-btn-container">
                        <button className="arrow-btn left" onClick={handlePrevMonth}>
                            <span className=""><i class="fa-solid fa-arrow-left"></i></span>
                        </button>
                        <h2 className="titular">{new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(new Date(currentYear, currentMonth))}</h2>
                        <button className="arrow-btn right" onClick={handleNextMonth}>
                            <span className=""><i class="fa-solid fa-arrow-right"></i></span>
                        </button>
                    </div>
                    <table className="calendar">
                        <thead className="days-week">
                            <tr>{daysOfWeek.map((day, index) => <th key={index}>{day}</th>)}</tr>
                        </thead>
                        <tbody>
                            {Array.from({ length: Math.ceil(generateCalendarDays().length / 7) }, (_, weekIndex) => (
                                <tr key={weekIndex}>
                                    {generateCalendarDays().slice(weekIndex * 7, weekIndex * 7 + 7).map((day, dayIndex) => (
                                        <td key={dayIndex} className={day.disabled ? "disabledDay" : day.today ? "selectedDay" : ""}>
                                            <a href={`#day${day.date}`}>{day.date}</a>
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Calendar