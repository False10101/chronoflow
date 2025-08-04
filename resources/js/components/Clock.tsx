
import React, { useState, useEffect } from 'react';

const Clock = () => {
    // State to hold the current time and date strings
    const [time, setTime] = useState('');
    const [date, setDate] = useState('');

    useEffect(() => {
        // Function to update the time and date
        const updateClock = () => {
            const now = new Date();

            // Formatter for the time (e.g., "10:57")
            // This uses the browser's default locale and timezone
            const timeFormatter = new Intl.DateTimeFormat(undefined, {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false // Use 24-hour format, change to true for AM/PM
            });

            // Formatter for the date (e.g., "Tuesday, June 24")
            const dateFormatter = new Intl.DateTimeFormat(undefined, {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
            });

            setTime(timeFormatter.format(now));
            setDate(dateFormatter.format(now));
        };

        // Update the clock immediately when the component mounts
        updateClock();

        // Set up an interval to update the clock every second
        const intervalId = setInterval(updateClock, 1000);

        // Clean up the interval when the component unmounts to prevent memory leaks
        return () => clearInterval(intervalId);
    }, []); // The empty dependency array ensures this effect runs only once on mount

    return (
        <div className='w-max text-white ml-auto hidden xl:flex flex-col text-right justify-start'>
            <div className='font-orbitron text-4xl text-[#E6D8FF] text-shadow-[#E6D8FF] font-semibold text-shadow-md tracking-widest'>
                {time}
            </div>
            <div className='text-[#E7CBFF] '>
                {date}
            </div>
        </div>
    );
};

export default Clock;
