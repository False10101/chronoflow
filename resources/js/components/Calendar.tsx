import React, {useState} from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';




    const generateCalendarDays = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize today's date for accurate comparison

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    
    const daysInMonth = lastDayOfMonth.getDate();
    const startDayOfWeek = firstDayOfMonth.getDay(); // 0 = Sunday, 1 = Monday...

    const days = [];

    // --- 1. Days from the previous month ---
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startDayOfWeek - 1; i >= 0; i--) {
        days.push({
            dayOfMonth: prevMonthLastDay - i,
            isCurrentMonth: false,
            isToday: false,
            date: new Date(year, month - 1, prevMonthLastDay - i),
        });
    }

    // --- 2. Days of the current month ---
    for (let i = 1; i <= daysInMonth; i++) {
        const currentDate = new Date(year, month, i);
        days.push({
            dayOfMonth: i,
            isCurrentMonth: true,
            isToday: currentDate.getTime() === today.getTime(),
            date: currentDate,
        });
    }

    // --- 3. Days from the next month ---
    const remainingCells = 42 - days.length; // 6 weeks * 7 days
    for (let i = 1; i <= remainingCells; i++) {
        days.push({
            dayOfMonth: i,
            isCurrentMonth: false,
            isToday: false,
            date: new Date(year, month + 1, i),
        });
    }

    return days;
};


const CustomCalendar = () => {
    const [currentDate, setCurrentDate] = React.useState(new Date());
    const calendarDays = generateCalendarDays(currentDate);

    const monthName = currentDate.toLocaleString('default', { month: 'long' });
    const year = currentDate.getFullYear();

    const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

    return (
        <div className="flex flex-col h-full w-full text-white ">
            {/* Header */}
            <div className="flex items-center gap-x-2 mt-1">
                <CalendarIcon size={16} color="#C6A6FF"  className='ml-4'/>
                <h2 className="font-lexend text-sm font-semibold">{monthName} {year}</h2>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-7 flex-grow">
                {/* Weekday Headers */}
                {weekdays.map(day => (
                    <span key={day} className="flex items-center justify-center text-xs font-semibold text-white/60">
                        {day}
                    </span>
                ))}

                {/* Day Cells */}
                {calendarDays.map((day, index) => (
                    <div
                        key={index}
                        className={`
                            flex items-center justify-center text-sm
                            ${day.isCurrentMonth ? 'text-white' : 'text-white/30'}
                        `}
                    >
                        <span
                            className={`
                                flex items-center justify-center w-3 h-1
                                ${day.isToday ? 'text-[#B388FF] font-bold rounded-full' : ''}
                            `}
                        >
                            {day.dayOfMonth}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CustomCalendar;
