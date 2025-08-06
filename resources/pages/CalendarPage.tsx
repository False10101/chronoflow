import React, { useState } from 'react'
import Clock from '@/components/Clock';
import Navbar from '@/components/Navbar';
import CustomCalendar from '@/components/Calendar';
import { Calendar1, CalendarMinus2, BookText, ClipboardList, ChevronLeft, ChevronRight, Plus, GraduationCap, Megaphone, School, Ticket } from 'lucide-react';

const CalendarPage = () => {
  const now = new Date();
  const [month, setMonth] = useState<number>(now.getMonth() + 1);
  const [monthDisplay, setMonthDisplay] = useState<string>(() => {
    const dateFormatter = new Intl.DateTimeFormat(undefined, { month: 'long', year: 'numeric' });
    return dateFormatter.format(now);
  });

  const monthDisplaySetter = (date: Date) => {
    const monthFormatter = new Intl.DateTimeFormat(undefined, { month: 'long', day: '2-digit' });
    return monthFormatter.format(date);
  }
  // Mock event data for the current month
  const mockEvents = [
    {
      id: 1,
      title: 'Math Assignment Due',
      date: new Date().toISOString().split('T')[0], // Today's date
      time: '18:00',
      category: 'assignment',
      priority: 'high',
      description: 'Complete chapter 5 problems'
    },
    {
      id: 2,
      title: 'Team Meeting',
      date: new Date().toISOString().split('T')[0], // Today's date
      time: '14:30',
      category: 'classes',
      priority: 'medium',
      description: 'Project status update'
    },
    {
      id: 3,
      title: 'Buy groceries',
      date: new Date().toISOString().split('T')[0], // Today's date
      time: '19:00',
      category: 'chore',
      priority: 'low'
    },
    {
      id: 4,
      title: 'Midterm Exam',
      date: new Date(new Date().setDate(new Date().getDate() + 3)).toISOString().split('T')[0],
      time: '09:00',
      category: 'exam',
      priority: 'high',
      description: 'Covers chapters 1-7',
      venue: 'Room 205, Science Building'
    },
    {
      id: 5,
      title: 'Yoga Session',
      date: new Date(new Date().setDate(new Date().getDate() + 5)).toISOString().split('T')[0],
      time: '16:00',
      category: 'personal',
      priority: 'medium',
      venue: 'Community Center'
    },
    {
      id: 6,
      title: 'New Assignment Posted',
      date: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().split('T')[0],
      time: '00:00',
      category: 'announcement',
      priority: 'medium'
    },
    {
      id: 7,
      title: 'Final Project Due',
      date: new Date(new Date().setDate(new Date().getDate() + 14)).toISOString().split('T')[0],
      time: '23:59',
      category: 'assignment',
      priority: 'high',
      description: 'Submit on LMS'
    },
    {
      id: 8,
      title: 'Dentist Appointment',
      date: new Date(new Date().setDate(new Date().getDate() + 10)).toISOString().split('T')[0],
      time: '11:30',
      category: 'chore',
      priority: 'medium',
      venue: 'City Dental Clinic'
    },
    {
      id: 1,
      title: 'Math Assignment Due',
      date: new Date().toISOString().split('T')[0], // Today's date
      time: '18:00',
      category: 'assignment',
      priority: 'high',
      description: 'Complete chapter 5 problems'
    },
    {
      id: 2,
      title: 'Team Meeting',
      date: new Date().toISOString().split('T')[0], // Today's date
      time: '14:30',
      category: 'classes',
      priority: 'medium',
      description: 'Project status update'
    },
    {
      id: 3,
      title: 'Buy groceries',
      date: new Date().toISOString().split('T')[0], // Today's date
      time: '19:00',
      category: 'chore',
      priority: 'low'
    },
    {
      id: 4,
      title: 'Midterm Exam',
      date: new Date(new Date().setDate(new Date().getDate() + 3)).toISOString().split('T')[0],
      time: '09:00',
      category: 'exam',
      priority: 'high',
      description: 'Covers chapters 1-7',
      venue: 'Room 205, Science Building'
    },
    {
      id: 5,
      title: 'Yoga Session',
      date: new Date(new Date().setDate(new Date().getDate() + 5)).toISOString().split('T')[0],
      time: '16:00',
      category: 'personal',
      priority: 'medium',
      venue: 'Community Center'
    },
    {
      id: 6,
      title: 'New Assignment Posted',
      date: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().split('T')[0],
      time: '00:00',
      category: 'announcement',
      priority: 'medium'
    },
    {
      id: 7,
      title: 'Final Project Due',
      date: new Date(new Date().setDate(new Date().getDate() + 14)).toISOString().split('T')[0],
      time: '23:59',
      category: 'assignment',
      priority: 'high',
      description: 'Submit on LMS'
    },
    {
      id: 8,
      title: 'Dentist Appointment',
      date: new Date(new Date().setDate(new Date().getDate() + 10)).toISOString().split('T')[0],
      time: '11:30',
      category: 'chore',
      priority: 'medium',
      venue: 'City Dental Clinic'
    }
  ];

  const getCategoryIconColor = (category: string) => {
    switch (category) {
      case 'announcement': return "#DA8FFF"
      case 'chore': return "#E0B0FF"
      case 'classes': return "#22C55E"
      case 'exam': return "#EF4444"
      case 'personal': return "#6200EA"
      case 'assignment': return "#B388FF"
    }
  }

  const getCategoryBorderColor = (category: string) => {
    switch (category) {
      case 'announcement': return "border-[#DA8FFF]"
      case 'chore': return "border-[#E0B0FF]"
      case 'classes': return "border-[#22C55E]"
      case 'exam': return "border-[#EF4444]"
      case 'personal': return "border-[#6200EA]"
      case 'assignment': return "border-[#B388FF]"
    }
  }

  const getCategoryBgColor = (category: string) => {
    switch (category) {
      case 'announcement': return "bg-[#DA8FFF]/20"
      case 'chore': return "bg-[#E0B0FF]/20"
      case 'classes': return "bg-[#22C55E]/20"
      case 'exam': return "bg-[#EF4444]/20"
      case 'personal': return "bg-[#6200EA]/20"
      case 'assignment': return "bg-[#B388FF]/20"
    }
  }

  // Filter events for today
  const todayEvents = mockEvents.filter(event =>
    event.date === new Date().toISOString().split('T')[0]
  ).sort((a, b) => a.time.localeCompare(b.time));;


  // Filter upcoming events (excluding today)
  const upcomingEvents = mockEvents.filter(event =>
    new Date(event.date) > new Date() && event.date !== new Date().toISOString().split('T')[0]
  );



  // Function to get category icon or text
  const getCategoryDisplay = (category: string, fixedColor?: string) => {
    const color = fixedColor || getCategoryIconColor(category)
    const categoryMap: Record<string, any> = {
      'assignment': <BookText color={color} size={20} />,
      'exam': <GraduationCap color={color} size={20} />,
      'announcement': <Megaphone color={color} size={20} />,
      'chore': <ClipboardList color={color} size={20} />,
      'personal': <Ticket color={color} size={20} />,
      'classes': <School color={color} size={20} />
    };
    return categoryMap[category] || category;
  };

  const getEventLocationInfo = (event: any) => {
    if (event.venue) {
      return `${event.venue} • ${event.time}`;
    }
    return event.time;
  };

  const categoryCounts = mockEvents.reduce((acc, event) => {
    acc[event.category] = (acc[event.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const categories = [
    'assignment', 'classes', 'exam',
    'personal', 'announcement', 'chore'
  ];

  return (
    <div className="flex h-min xl:h-screen bg-gradient-to-t from-[#05020A] to-[#100A14] xl:max-h-screen overflow-hidden w-full">
      <Navbar />
      <div className='main-container flex flex-col w-[95%] h-full p-7'>
        <div className='top-row grid xl:flex mb-2 ml-3 items-center'>
          <div className='space-y-1 flex flex-col '>
            <h1 className='font-lexend text-3xl font-bold text-[#C6A6FF]'>Calendar <span className='text-white'>Hub</span></h1>
            <span className='border-t-[1px] pr-7 border-white/[63%] pt-1 w-max text-sm text-white/70'>Manage your events and schedule</span>
          </div>
          <div className='calendar-config flex ml-auto mb-2 items-center space-x-7'>
            <button className='flex previous-button items-center'>
              <ChevronLeft size={20} />
              <span className='text-sm'>Previous</span>
            </button>

            <span className='font-orbitron text-xl mb-1'>{monthDisplay}</span>

            <button className='flex next-button items-center'>
              <ChevronRight size={20} />
              <span className='text-sm'>Previous</span>
            </button>

            <button className=' border-[1px] border-[#B388FF] py-1 px-2 rounded-md flex items-center text-sm drop-shadow-[#B388FF] drop-shadow-xl'>
              <Plus size={15} className='flex mr-1 drop-shadow-xs drop-shadow-[#B388FF]' color='#B388FF' />
              <span className='flex text-[#B388FF]'>Add Events</span>
            </button>
          </div>
        </div>
        <div className='body-container flex flex-col h-[86%]'>
          <div className='middle-container flex h-[88%] w-full'>
            <div className='left-calendar-box w-[60%] border-[#B388FF]/50 border-[1px] mx-3 flex rounded-xl mt-5'>
              <CustomCalendar month={month} events={mockEvents} />
            </div>
            <div className='right-boxes w-[35%] ml-auto flex mt-5 px-3 flex-col justify-between'>
              <div className='today-event-list border-[1px] border-[#B388FF]/50 h-[48%] w-full rounded-lg px-4 py-1.5 flex-col flex'>
                <div className='flex top-row my-2'>
                  <Calendar1 size={25} color='#B388FF' />
                  <span className='font-orbitron ml-2 '>Today's Events</span>
                </div>
                <div className='flex flex-col today-event-list mt-1 space-y-2 overflow-y-auto'>
                  {todayEvents.length > 0 ? (
                    todayEvents.map(event => (
                      <div key={event.id} className='event-item border-l-4 border-[#B388FF] p-2 px-4 flex rounded-lg items-center text-sm'>
                        <div className='w-9 h-9 flex aspect-square bg-[#B388FF]/20 items-center justify-center rounded-full '><span>{getCategoryDisplay(event.category, "#B388FF")}</span></div>

                        <div className='flex items-center flex-col ml-4'>
                          <span className=' text-white flex mr-auto'>{event.title}</span>
                          <span className='mt-1 text-start flex mr-auto'>Before : {event.time}</span>
                        </div>
                        <span className={`text-xs ml-auto items-center flex text-white/50`}>
                          {event.priority.toUpperCase()}
                        </span>
                        <div className='flex justify-between text-sm text-white/70 mt-1'>


                        </div>
                      </div>
                    ))
                  ) : (
                    <p className='text-white/50 text-sm mt-2'>No events scheduled for today</p>
                  )}
                </div>
              </div>

              <div className='upcoming-event-list border-[1px] border-[#B388FF]/50 h-[48%] w-full rounded-lg px-4 py-1.5 flex-col flex'>
                <div className='flex top-row my-2'>
                  <CalendarMinus2 size={25} color='#B388FF' />
                  <span className='font-orbitron ml-2'>Upcoming Events</span>
                </div>
                <div className='flex flex-col upcoming-event-list mt-1 space-y-2 overflow-y-auto'>
                  {upcomingEvents.length > 0 ? (
                    upcomingEvents.map(event => (
                      <div key={event.id} className={`event-item border-l-4 ${getCategoryBorderColor(event.category)} p-2 px-4 flex rounded-lg items-center text-sm`}>
                        <div className={`w-9 h-9 flex aspect-square ${getCategoryBgColor(event.category)} items-center justify-center rounded-full `}><span>{getCategoryDisplay(event.category)}</span></div>

                        <div className='flex items-center flex-col ml-4'>
                          <span className=' text-white flex mr-auto'>{event.title}</span>
                          <span className='mt-1 text-start flex mr-auto'>{monthDisplaySetter(new Date(event.date))}, {event.venue ? event.venue : event.time}</span>
                        </div>
                        <span className={`text-xs ml-auto items-center flex text-white/50`}>
                          {event.priority.toUpperCase()}
                        </span>
                        <div className='flex justify-between text-sm text-white/70 mt-1'>


                        </div>
                      </div>
                    ))
                  ) : (
                    <p className='text-white/50 text-sm mt-2'>No upcoming events</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className='bottom-category-list flex flex-wrap h-[15%] border border-white/20 rounded-lg mx-3 mt-5 p-3'>
            {categories.map(category => (
              <div key={category} className="w-1/3 flex items-center px-4 py-2">
                <span
                  className="w-2 h-2 rounded-full mr-2"
                  style={{ backgroundColor: getCategoryIconColor(category) }}
                ></span>
                <span className="text-white/80 text-sm capitalize mr-1">
                  {category}:
                </span>
                <span className="text-white font-medium">
                  {categoryCounts[category] || 0}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CalendarPage;