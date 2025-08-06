import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';

interface CustomCalendarProps {
  month?: number;
  year?: number;
  events?: Array<{
    id: number;
    title: string;
    date: string;
    time: string;
    category: string;
    priority: string;
    description?: string;
    venue?: string;
  }>;
}

interface CalendarDay {
  dayOfMonth: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  date: Date;
}

const generateCalendarDays = (date: Date): CalendarDay[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    
    const daysInMonth = lastDayOfMonth.getDate();
    const startDayOfWeek = firstDayOfMonth.getDay();

    const days: CalendarDay[] = [];

    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startDayOfWeek - 1; i >= 0; i--) {
        days.push({
            dayOfMonth: prevMonthLastDay - i,
            isCurrentMonth: false,
            isToday: false,
            date: new Date(year, month - 1, prevMonthLastDay - i),
        });
    }

    for (let i = 1; i <= daysInMonth; i++) {
        const currentDate = new Date(year, month, i);
        days.push({
            dayOfMonth: i,
            isCurrentMonth: true,
            isToday: currentDate.getTime() === today.getTime(),
            date: currentDate,
        });
    }

    const remainingCells = 42 - days.length;
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

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'announcement': return "#DA8FFF";
    case 'chore': return "#E0B0FF";
    case 'classes': return "#22C55E";
    case 'exam': return "#EF4444";
    case 'personal': return "#6200EA";
    case 'assignment': return "#B388FF";
    default: return "#B388FF";
  }
};

const CustomCalendar: React.FC<CustomCalendarProps> = ({ month, year, events = [] }) => {
    const getInitialDate = () => {
        const now = new Date();
        const targetYear = year || now.getFullYear();
        const targetMonth = month ? month - 1 : now.getMonth();
        return new Date(targetYear, targetMonth, 1);
    };

    const [displayDate, setDisplayDate] = useState<Date>(getInitialDate());

    useEffect(() => {
        setDisplayDate(getInitialDate());
    }, [month, year]);

    const calendarDays: CalendarDay[] = generateCalendarDays(displayDate);
    const monthName: string = displayDate.toLocaleString('default', { month: 'long' });
    const displayYear: number = displayDate.getFullYear();

    const weekdays: string[] = month? ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] :['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

    const getEventsForDay = (day: CalendarDay) => {
      if (!day.isCurrentMonth) return [];
      const dateStr = day.date.toISOString().split('T')[0];
      return events.filter(event => event.date === dateStr);
    };

    return (
        <div className="flex flex-col h-full w-full text-white ">
            <div className={`${month ? "hidden" : "flex"} items-center gap-x-2 mb-2`}>
                <CalendarIcon size={16} color="#C6A6FF"  className='ml-4'/>
                <h2 className="font-lexend text-sm font-semibold">{monthName} {displayYear}</h2>
            </div>

            <div className="grid grid-cols-7">
                {weekdays.map(day => (
                    <span 
                        key={day} 
                        className={`
                            flex items-center justify-center   text-white/60 
                            ${month ? 'mt-4 mb-2 ml-3' : 'text-xs font-semibold'}
                        `}
                    >
                        {day}
                    </span>
                ))}
            </div>

            <div className={`grid grid-cols-7 ${month ? "h-full" : ""} gap-1 mb-2 ${month ? "px-7" : ""}`}>
  {calendarDays.map((day, index) => (
    <div
      key={index}
      className={`
        relative
        ${month ? 
          "min-h-[3rem] border border-white/5 rounded-md bg-black/40 hover:border-white/25" : 
          "flex items-center justify-center"
        }
        ${day.isCurrentMonth ? 'text-white' : 'text-white/30'}
        ${day.isToday ? "!border-[#B388FF] !border-2" : ""}
      `}
    >
      <span className={`
        ${month ? "absolute top-1 right-1 text-xs" : "text-xs"}
        ${day.isToday ? "text-[#B388FF] font-bold" : ""}
      `}>
        {day.dayOfMonth}
      </span>

      {month && (
        <div className="absolute inset-0 pt-6 overflow-hidden">
          <div className="h-full overflow-y-auto scrollbar-hide px-1">
            {getEventsForDay(day).map(event => (
              <div 
                key={event.id}
                className="text-[0.6rem] px-1 py-1.5 mb-1 rounded truncate"
                style={{ 
                  backgroundColor: `${getCategoryColor(event.category)}30`,
                  lineHeight: '1.2'
                }}
              >
                {event.title}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  ))}
</div>
        </div>
    );
};

export default CustomCalendar;