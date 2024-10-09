import React from 'react';

const Calendar = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center h-full px-20">
      {/* Text on the right for desktop, above for mobile */}
      <div className="md:w-1/2 p-4">
        <h1 className="text-2xl font-bold text-center md:text-left">Calendar</h1>
      </div>
      <div className="md:w-1/2 w-full" style={{ maxWidth: '800px', height: '550px' }}>
        <iframe
         src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=Asia%2FKolkata&bgcolor=%23ffffff&showPrint=0&showTz=0&title=Will-Rename&src=MjcyYTk5ODI0NzUwYjFkM2M2NmY2OGQyMzMwMDljMWUxNGRhM2M5MmJlYzE0ZWVkOWVkYTY2NzEzZWExMzYwNEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=ZW4tZ2IuaW5kaWFuI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&color=%23795548&color=%230B8043"
         style={{ border: 'solid 1px #777', width: '100%', height: '100%' }}
         className='bg-blue-900'
         frameBorder="0"
         scrolling="no"
         title="Google Calendar"
       ></iframe>
     </div>
   </div>
  );
};

export default Calendar;
