import Clock from '@/components/Clock';
import Navbar from '@/components/Navbar';
import { Routes, Route, useNavigate } from 'react-router-dom';
import React, { useState, useEffect, JSX } from 'react';
import {
    Sun, Moon, Cloud, CloudSun, CloudMoon, CloudRain,
    CloudDrizzle, CloudSnow, CloudLightning, CloudFog,
    Wind,
    Droplets,
    ChartLine,
    Bell,
    ClipboardEdit,
    BookOpen,
    GraduationCap,
    CalendarDays,
    Trash2,
    MapPin,
    BarChart2,
    BadgeDollarSign
} from 'lucide-react';
import 'react-calendar/dist/Calendar.css';
import CustomCalendar from '@/components/Calendar';
import ProgressBar from "@ramonak/react-progress-bar";

// --- Import Chart.js components ---
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import ExpenseModule from '@/components/ExpenseModule';

// --- Register Chart.js components ---
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);


interface WeatherCondition {
    text: string;
    code: number;
}

interface WeatherData {
    temp_c: number;
    condition: WeatherCondition;
    is_day: number;
    wind_kph: number;
    humidity: number;
}

interface LocationData {
    name: string;
    region: string;
    country: string;
}

interface Event {
    name: string;
    due_date: string; // Format: "YYYY-MM-DD"
    type: 'exam' | 'assignment' | 'school' | 'calendar' | 'chore';
    venue?: string; // Optional venue for exams and school events
}

const getWeatherIcon = (code: number, isDay: number, size: number): JSX.Element => {
    const props = { size };
    switch (code) {
        case 1000: // Sunny / Clear
            return isDay ? <Sun {...props} color="#DA8FFF" /> : <Moon {...props} color="#DA8FFF" />;
        case 1003: // Partly cloudy
            return isDay ? <CloudSun {...props} color="#DA8FFF" /> : <CloudMoon {...props} color="#DA8FFF" />;
        case 1006: // Cloudy
        case 1009: // Overcast
            return <Cloud {...props} color="#DA8FFF" />;
        case 1030: // Mist
        case 1135: // Fog
        case 1147: // Freezing fog
            return <CloudFog {...props} color="#DA8FFF" />;
        case 1063: // Patchy rain possible
        case 1150: // Patchy light drizzle
        case 1153: // Light drizzle
        case 1180: // Patchy light rain
        case 1183: // Light rain
            return <CloudDrizzle {...props} color="#DA8FFF" />;
        case 1066: // Patchy snow possible
        case 1210: // Patchy light snow
        case 1213: // Light snow
        case 1255: // Light snow showers
            return <CloudSnow {...props} color="#DA8FFF" />;
        case 1087: // Thundery outbreaks possible
        case 1273: // Patchy light rain with thunder
        case 1276: // Moderate or heavy rain with thunder
        case 1279: // Patchy light snow with thunder
        case 1282: // Moderate or heavy snow with thunder
            return <CloudLightning {...props} color="#DA8FFF" />;
        case 1186: // Moderate rain at times
        case 1189: // Moderate rain
        case 1192: // Heavy rain at times
        case 1195: // Heavy rain
        case 1240: // Light rain shower
        case 1243: // Moderate or heavy rain shower
        case 1246: // Torrential rain shower
            return <CloudRain {...props} color="#DA8FFF" />;
        default: // Default to a simple cloud for other cases
            return <Cloud {...props} color="#DA8FFF" />;
    }
};

const getDaysLeft = (dueDate: string): string => {
    const now = new Date();
    const due = new Date(dueDate + "T23:59:59");
    now.setHours(0, 0, 0, 0);

    const diffTime = due.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return "Overdue";
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Tomorrow";
    return `in ${diffDays} days`;
};

const DashboardPage = () => {
    const navigate = useNavigate();

    // --- State for Weather ---
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [location, setLocation] = useState<LocationData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [trackerView, setTrackerView] = useState<boolean>(false);

    // --- Chart Configuration ---
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false, // Allows custom height
        plugins: {
            title: {
                display: true,
                text: 'Weekly Amount Overview',
                color: '#E0E0E0',
                font: {
                    size: 16,
                    family: "'Orbitron', sans-serif"
                },
                align: 'start',
                padding: {
                    top: 10,
                    bottom: 10,
                }
            },
            legend: {
                position: 'top' as const,
                labels: {
                    color: '#FFFFFFCC' // Legend text color
                },

            },
        },
        scales: {
            x: {
                stacked: true,
                ticks: {
                    color: '#FFFFFFB3', // X-axis labels (days)
                },
                grid: {
                    color: '#FFFFFF1A', // X-axis grid lines
                },
            },
            y: {
                stacked: true,
                beginAtZero: true,
                ticks: {
                    color: '#FFFFFFB3', // Y-axis labels (amounts)
                },
                grid: {
                    color: '#FFFFFF1A', // Y-axis grid lines
                },
            },
        },
    };

    // --- Mock Data for the Bar Chart ---
    const getLast7Days = () => {
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        return Array.from({ length: 7 }, (_, i) => {
            const d = new Date();
            d.setDate(d.getDate() - (6 - i));
            return days[d.getDay()];
        });
    };

    const labels = getLast7Days();

    const chartData = {
        labels,
        datasets: [
            {
                label: 'Homework',
                data: labels.map(() => Math.floor(Math.random() * 50 + 10)),
                backgroundColor: '#bea0ee',
                borderRadius: 7,
            },
            {
                label: 'Study',
                data: labels.map(() => Math.floor(Math.random() * 50 + 10)),
                backgroundColor: '#9a7dc8',
                borderRadius: 7,
            },
            {
                label: 'Chores',
                data: labels.map(() => Math.floor(Math.random() * 50 + 10)),
                backgroundColor: '#8061af',
                borderRadius: 7,
            },
            {
                label: 'Exercise',
                data: labels.map(() => Math.floor(Math.random() * 50 + 10)),
                backgroundColor: '#604789',
                borderRadius: 7,
            },
            {
                label: 'Leisure',
                data: labels.map(() => Math.floor(Math.random() * 50 + 10)),
                backgroundColor: '#604789',
                borderRadius: 7,
            },
        ],
    };

    const mockEvents: Event[] = [
        { name: 'Physics Class', due_date: '2025-08-04', type: 'school', venue: 'Building A, Room 101' },
        { name: 'Lab Report 3', due_date: '2025-08-04', type: 'assignment' },
        { name: 'Chemistry Midterm', due_date: '2025-08-08', type: 'exam', venue: 'Exam Hall B' },
        { name: 'Dentist Appointment', due_date: '2025-08-06', type: 'calendar' },
        { name: 'Take Out Trash', due_date: '2025-08-03', type: 'chore' },
        { name: 'History Reading Ch. 5', due_date: '2025-08-15', type: 'assignment' },
        { name: 'Physics Class', due_date: '2025-08-04', type: 'school', venue: 'Building A, Room 101' },
        { name: 'Lab Report 3', due_date: '2025-08-04', type: 'assignment' },
        { name: 'Chemistry Midterm', due_date: '2025-08-08', type: 'exam', venue: 'Exam Hall B' },
        { name: 'Dentist Appointment', due_date: '2025-08-06', type: 'calendar' },
        { name: 'Take Out Trash', due_date: '2025-08-03', type: 'chore' },
        { name: 'History Reading Ch. 5', due_date: '2025-08-15', type: 'assignment' },
        { name: 'Physics Class', due_date: '2025-08-04', type: 'school', venue: 'Building A, Room 101' },
        { name: 'Lab Report 3', due_date: '2025-08-04', type: 'assignment' },
        { name: 'Chemistry Midterm', due_date: '2025-08-08', type: 'exam', venue: 'Exam Hall B' },
        { name: 'Dentist Appointment', due_date: '2025-08-06', type: 'calendar' },
        { name: 'Take Out Trash', due_date: '2025-08-03', type: 'chore' },
        { name: 'History Reading Ch. 5', due_date: '2025-08-15', type: 'assignment' },
    ];

    const eventStyles: { [key: string]: { color: string; icon: React.FC<any> } } = {
        exam: { color: '#B388FF', icon: BookOpen },
        assignment: { color: '#DA8FFF', icon: ClipboardEdit },
        school: { color: '#82B1FF', icon: GraduationCap },
        calendar: { color: '#C6A6FF', icon: CalendarDays },
        chore: { color: '#8C9EFF', icon: Trash2 }
    };



    const handleLogout = () => {
        localStorage.removeItem('api_token');
        navigate('/login');
    };


    useEffect(() => {
        const fetchWeather = async (lat: number, lon: number) => {
            setLoading(true);
            try {
                const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
                const response = await fetch(`https://api.weatherapi.com/v1/current.json?q=${lat},${lon}&key=${apiKey}`);
                if (!response.ok) throw new Error('Failed to fetch weather data.');
                const data = await response.json();
                setWeather(data.current);
                setLocation(data.location);
                setError(null);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred.');
            } finally {
                setLoading(false);
            }
        };

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => fetchWeather(position.coords.latitude, position.coords.longitude),
                (err) => {
                    setError('Location access denied. Please enable it in your browser settings.');
                    setLoading(false);
                }
            );
        } else {
            setError('Geolocation is not supported by this browser.');
            setLoading(false);
        }
    }, []);

    const displayLocation = location ? `${location.name}, ${location.region}` : 'Loading location...';
    const sortedEvents = [...mockEvents].sort((a, b) => new Date(a.due_date).getTime() - new Date(b.due_date).getTime());


    return (
        <div className="flex h-min xl:h-screen bg-gradient-to-t from-[#05020A] to-[#100A14] xl:max-h-screen overflow-hidden w-full">
            <Navbar />
            <div className='body-container flex flex-col h-max xl:h-full w-full xl:w-[95%] py-7 xl:p-7'>
                <div className='top-row grid xl:flex mb-6 ml-3'>
                    <div className='space-y-1 flex flex-col '>
                        <h1 className='font-lexend text-3xl font-bold text-[#C6A6FF]'>Welcome Back, <span className='text-white'>IssacTest1</span></h1>
                        <span className='border-t-[1px] pr-7 border-white/[63%] pt-1 w-max'>Ready to manage your day?</span>
                    </div>
                    <Clock />
                </div>
                <div className='main-container justify-center w-full grid xl:flex flex-grow overflow-auto h-auto xl:h-none'>
                    <div className='left-container flex flex-col w-[100%] xl:w-[70%]  h-full xl:pr-2 space-y-7 xl:space-y-0'>
                        <div className='first-row w-full flex h-[28%] '>
                            <div className='weather-box grid grid-cols-2 w-[44%] border-b-[1px] border-[#B388FF]/[44%] ml-7 pb-7 mt-10'>
                                <div className='flex flex-col'>
                                    {error && <div className="w-16 h-16 text-red-500 flex items-center justify-center">Error</div>}
                                    <div className='flex'>
                                        <div className='flex text-2xl font-semibold font-orbitron'>{weather ? `${Math.round(weather.temp_c)}°C` : ''}</div>
                                        <div className='flex mt-7'>{weather ? weather.condition.text : ''}</div>
                                    </div>
                                    {weather && (
                                        <div className='flex w-full -mt-3 ml-1'>
                                            {getWeatherIcon(weather.condition.code, weather.is_day, 64)}
                                        </div>
                                    )}
                                </div>
                                <div className='flex flex-col ml-auto items-end'>
                                    <span className='font-orbitron font-semibold text-2xl '>{location ? location.name : "--"}</span>
                                    <span className='text-sm text-white/[70%]'>{location ? location.region : "--"}, <span>{location ? location.country : "--"}</span></span>
                                    <div className='flex space-x-1 mt-6'>
                                        <Wind color='#DA8FFF' />
                                        <span className='mr-5'>{weather ? weather.wind_kph : "-"}km/h</span>
                                        <Droplets color='#DA8FFF' />
                                        <span>{weather ? weather.humidity : "-"}%</span>
                                    </div>
                                </div>
                            </div>
                            <div className='calendar-box flex flex-col flex-grow px-4 py-3 border border-[#B388FF]/[22%] rounded-lg mx-10 bg-gradient-to-b from-[#05010D] to-[#11091C]'>
                                <CustomCalendar />
                            </div>
                        </div>
                        <div className='second-row flex w-full h-[28%] mt-6 px-6'>
                            <div className='progress-tracker w-full h-full flex flex-col'>
                                <div className='w-full h-max flex'>
                                    <h1 className='flex space-x-3 items-center'>
                                        <ChartLine color="#B388FF" />
                                        <span className='font-orbitron text-xl font-semibold'>Progress Tracker</span>
                                    </h1>
                                    <button className={`ml-auto text-xs flex mr-5  px-3 rounded-full border-[1px]  items-center ${!trackerView ? "text-[#B388FF] bg-[#B388FF]/20 border-[#B388FF]" : "border-white text-white/70"}`}>Weekly</button>
                                    <button className={`flex text-xs mr-5  px-3 rounded-full border-[1px] items-center  ${trackerView ? "text-[#B388FF] bg-[#B388FF]/20 border-[#B388FF]" : "border-white/20 text-white/70"}`}>Monthly</button>
                                </div>
                                <div className='flex w-full pr-4 flex-grow pt-4 space-x-8'>
                                    <div className='homework-card flex w-[30%] flex-col flex-grow  py-2 px-2 bg-black/40 rounded-lg px-3 py-3 space-y-2'>
                                        <div className='flex w-full items-center'>
                                            <span className='text-lg'>Homework</span>
                                            <span className='ml-auto font-orbitron text-[#B388FF]'>74%</span>
                                        </div>
                                        <ProgressBar completed="60" height='1em' baseBgColor='#FFFFFF1A' bgColor='linear-gradient(to right, #B388FF 0%, #DA8FFF 100%)' isLabelVisible={false} className='' animateOnRender={true} />
                                        <div className='flex w-full items-center text-sm'>
                                            <span className='text-white/70'><span className='text-[#B388FF] mr-1 font-semibold'>6</span>Completed</span>
                                            <span className='ml-auto text-white/70'><span className='text-[#B388FF] mr-1 font-semibold'>6</span>Remaining</span>
                                        </div>
                                        <div className='flex flex-col w-full text-sm'>
                                            <div className='flex'>
                                                <span className='truncate'>Physics Lab Report</span>
                                                <span className='ml-auto text-white/70'>Due tomorrow</span>
                                            </div>
                                            <div className='flex'>
                                                <span className='truncate'>Math Problem Set</span>
                                                <span className='ml-auto text-white/70'>Due in 3 days</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='exams-card flex w-[30%] flex-col flex-grow py-2 px-2 bg-black/40 rounded-lg px-3 py-3 space-y-2'>
                                        <div className='flex w-full items-center'>
                                            <span className='text-lg'>Exams</span>
                                            <span className='ml-auto font-orbitron text-[#B388FF]'>42%</span>
                                        </div>
                                        <ProgressBar completed="60" height='1em' baseBgColor='#FFFFFF1A' bgColor='linear-gradient(to right, #B388FF 0%, #DA8FFF 100%)' isLabelVisible={false} className='' animateOnRender={true} />
                                        <div className='flex w-full items-center text-sm'>
                                            <span className='text-white/70'><span className='text-[#B388FF] mr-1 font-semibold'>2</span>Completed</span>
                                            <span className='ml-auto text-white/70'><span className='text-[#B388FF] mr-1 font-semibold'>3</span>Remaining</span>
                                        </div>
                                        <div className='flex flex-col w-full text-sm'>
                                            <div className='flex'>
                                                <span className='truncate'>Chemistry Midterm</span>
                                                <span className='ml-auto text-white/70'>In 5 days</span>
                                            </div>
                                            <div className='flex'>
                                                <span className='truncate'>History Final</span>
                                                <span className='ml-auto text-white/70'>In 2 weeks</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='chores-card flex w-[30%] flex-col flex-grow py-2 px-2 bg-black/40 rounded-lg px-3 py-3 space-y-2'>
                                        <div className='flex w-full items-center'>
                                            <span className='text-lg'>Chores</span>
                                            <span className='ml-auto font-orbitron text-[#B388FF]'>60%</span>
                                        </div>
                                        <ProgressBar completed="60" height='1em' baseBgColor='#FFFFFF1A' bgColor='linear-gradient(to right, #B388FF 0%, #DA8FFF 100%)' isLabelVisible={false} className='' animateOnRender={true} />
                                        <div className='flex w-full items-center text-sm'>
                                            <span className='text-white/70'><span className='text-[#B388FF] mr-1 font-semibold'>3</span>Completed</span>
                                            <span className='ml-auto text-white/70'><span className='text-[#B388FF] mr-1 font-semibold'>2</span>Remaining</span>
                                        </div>
                                        <div className='flex flex-col w-full text-sm'>
                                            <div className='flex'>
                                                <span className='truncate'>Clean Room</span>
                                                <span className='ml-auto text-white/70'>Today</span>
                                            </div>
                                            <div className='flex'>
                                                <span className='truncate'>Take Out Trash</span>
                                                <span className='ml-auto text-white/70'>Tomorrow</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='third-row w-full h-[44%] mt-6 px-6 pr-10 mb-1'>
                            <div className='bg-[radial-gradient(ellipse_at_center,_#241A3A_0%,_#07020D_100%)] rounded-lg p-2 h-full w-full border-[1px] border-[#B388FF]/50'>
                                <div className='flex items-center mb-2 ml-2'>
                                    <BarChart2 size={20} color="#B388FF" className="mr-2" />
                                    <span className='font-orbitron text-[#E0E0E0] text-lg'>Weekly Amount Overview</span>
                                </div>
                                <div className='h-[calc(100%-36px)]'> {/* Adjust height to account for title space */}
                                    <Bar options={{
                                        ...chartOptions,
                                        plugins: {
                                            ...chartOptions.plugins,
                                            title: {
                                                display: false // Disable the Chart.js title since we're rendering our own
                                            }
                                        }
                                    }} data={chartData} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='right-container flex flex-col w-[100%] xl:w-[28%] mr-1 xl:flex-1 min-h-[fit-content] space-y-7 xl:space-y-0 mt-7 xl:mt-0'>
                        <div className='w-full xl:h-[30%] mb-5 flex flex-col justify-self-center self-center w-[98%] h-auto'>
                            <ExpenseModule expenseBoxSize={40}/>

                            <div className='expense-breakdown w-[95%] self-center justify-self-center mt-4'>
                                <div className='flex items-center mb-2'>
                                    <span className='font-orbitron text-sm'>Expense Breakdown</span>
                                </div>

                                {/* Combined progress bar */}
                                <div className='relative h-4 w-full bg-[#FFFFFF1A] rounded-[3px] overflow-hidden mb-2 '>
                                    <div
                                        className='absolute h-full rounded-[3px]'
                                        style={{ width: '34.5%', backgroundColor: '#B388FF' }}
                                    ></div>
                                    <div
                                        className='absolute h-full rounded-[3px]'
                                        style={{ width: '24.5%', backgroundColor: '#DA8FFF', left: '35%' }}
                                    ></div>
                                    <div
                                        className='absolute h-full rounded-[3px]'
                                        style={{ width: '19.5%', backgroundColor: '#82B1FF', left: '60%' }}
                                    ></div>
                                    <div
                                        className='absolute h-full rounded-[3px]'
                                        style={{ width: '19.5%', backgroundColor: '#8C9EFF', left: '80%' }}
                                    ></div>
                                </div>

                                {/* Legend */}
                                <div className='justify-evenly w-full overflow-hidden flex text-xs'>
                                    <div className='flex items-center'>
                                        <div className='w-3 h-3 aspect-square rounded-full bg-[#B388FF] mr-1'></div>
                                        <span className='truncate'>Food</span>
                                        <span className='ml-1'>35%</span>
                                    </div>
                                    <div className='flex items-center'>
                                        <div className='w-3 h-3 aspect-square rounded-full bg-[#DA8FFF] mr-1'></div>
                                        <span className='truncate'>Subscriptions</span>
                                        <span className='ml-1'>25%</span>
                                    </div>
                                    <div className='flex items-center'>
                                        <div className='w-3 h-3 aspect-square rounded-full bg-[#82B1FF] mr-1'></div>
                                        <span className='truncate'>Utility</span>
                                        <span className='ml-1'>20%</span>
                                    </div>
                                    <div className='flex items-center'>
                                        <div className='w-3 h-3 aspect-square rounded-full bg-[#8C9EFF] mr-1'></div>
                                        <span className='truncate'>Misc</span>
                                        <span className='ml-1'>20%</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className=' flex flex-col xl:h-[67%] w-full border-[1px] h-[400px] border-[#B388FF]/50 rounded-2xl py-5 px-5 overflow-hidden'>
                            <div className='w-full flex items-center mb-3'>
                                <Bell size={20} color='#B388FF' strokeWidth={3} className='mr-3' />
                                <span className='font-orbitron font-semibold'>Upcoming Events</span>
                            </div>
                            <div className='grid h-full overflow-hidden'>
                                <div className='flex-grow overflow-y-auto pr-2 custom-scrollbar'>
                                    {sortedEvents.map((event, index) => {
                                        const eventStyle = eventStyles[event.type];
                                        return (
                                            <div
                                                className={`w-full flex items-center p-2 bg-[#67688F]/15 rounded-lg mb-3 hover:bg-black/40 transition-colors  border-l-4`}
                                                key={index}
                                                style={{ borderLeftColor: eventStyle.color }}
                                            >


                                                {/* 2. Corresponding Lucide icon */}
                                                <div className='mr-3 flex-shrink-0'>
                                                    <eventStyle.icon size={18} color={eventStyle.color} />
                                                </div>

                                                {/* 3. Name + Due Date + Location (vertical stack) */}
                                                <div className='flex flex-col flex-grow min-w-0'>
                                                    <span className='font-medium truncate'>{event.name}</span>
                                                    <div className='flex text-sm text-white/70'>
                                                        {event.venue ? (
                                                            <span className='flex items-center truncate'>
                                                                <MapPin size={14} className='mr-1 flex-shrink-0' />
                                                                <span className='truncate'>{event.venue}</span>
                                                            </span>
                                                        ) : (
                                                            <span className='truncate'>{new Date(event.due_date).toLocaleDateString()}</span>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* 4. Days calculation on the rightmost */}
                                                <div className='ml-3 flex-shrink-0'>
                                                    <span className={`text-sm ${getDaysLeft(event.due_date) === 'Overdue' ? 'text-red-400' :
                                                        getDaysLeft(event.due_date) === 'Today' ? 'text-amber-300' :
                                                            'text-[#B388FF]'
                                                        }`}>
                                                        {getDaysLeft(event.due_date)}
                                                    </span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default DashboardPage;