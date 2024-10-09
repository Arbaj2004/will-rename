import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; // for event interaction
import axios from 'axios';


const Calender = () => {
  const [events, setEvents] = useState([
    // Initial events can be added here if needed
  ]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/admin/events`);
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  // Handle event addition
  // const handleDateClick = (arg) => {
  //   const title = prompt('Enter Event Title:');
  //   if (title) {
  //     setEvents((prevEvents) => [
  //       ...prevEvents,
  //       { title, start: arg.date, allDay: true },
  //     ]);
  //   }
  // };

  const getLocalDate = (date) => {
    return date.toLocaleDateString('en-CA'); // 'en-CA' format is 'YYYY-MM-DD'
  };

  const dayCellClassNames = (arg) => {
    const today = getLocalDate(new Date()); // Get today's local date
    const currentDate = getLocalDate(arg.date); // Current cell date in 'YYYY-MM-DD'

    // Check if the current day has any events
    const hasEvent = events.some((event) => event.date === currentDate);

    if (currentDate === today) {
      return 'bg-blue-500 text-white'; // Highlight current day
    }

    if (hasEvent) {
      return 'bg-red-500 text-white cursor-pointer transition-transform transform hover:scale-105 duration-200 ease-in-out'; // Highlight event days in red and animate on hover
    }

    return 'dark:bg-slate-900 bg-blue-300 dark:text-white text-black'; // Default date style
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center h-full px-4 md:px-20 overflow-hidden">
      {/* Text on the right for desktop, above for mobile */}
      <div className="md:w-1/2 p-4">
        <h1 className="text-2xl font-bold text-center md:text-left">Calendar</h1>
      </div>
      <div className="md:w-1/2 w-full dark:bg-slate-600 bg-slate-400 text-black p-7 rounded-2xl" style={{ maxWidth: '800px', height: '550px' }}>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events} // Pass the events to FullCalendar
          // dateClick={handleDateClick} // Handle date click to add events
          dayCellClassNames={dayCellClassNames}
          className="bg-gray-800 text-white" // FullCalendar styling

        />
      </div>
    </div>
  );
};

export default Calender;
