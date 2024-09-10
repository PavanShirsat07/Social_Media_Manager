import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Important for accessibility

const Calendar = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
useEffect(() => {
  fetch('http://localhost:5001/mydatabase/events')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      console.log("Connected to MOgodb")
      return response.json();
    })
.then(data => {
  console.log('Fetched data:', data); // Log the fetched data
  const mappedEvents = data.map(event => ({
    title: event.title,
    start: new Date(event.start).toISOString(),
    end: new Date(event.end).toISOString(),
    extendedProps: {
      info: event.info,
      img: event.img,
      like: event.like,
      comment: event.comment,
      shares: event.shares,
      impressions: event.impressions
    }
  }));

      setEvents(mappedEvents);
      setLoading(false);
    })
    .catch(error => {
      setError('Error fetching events');
      setLoading(false);
      console.error('Error fetching events:', error);
    });
}, []);

  

  // Handle date click event (you can modify as needed)
  const handleDateClick = (date) => {
    console.log("Date clicked:", date); // Example: Log the clicked date to the console
  };

  // Handle event click to show modal
  const handleEventClick = (eventInfo) => {
    setSelectedEvent(eventInfo.event);
    setModalIsOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedEvent(null);
  };

  return (
    <>
      {/* Main container */}
      <div className='flex border border-gray-200 h-[70vh]'>

        {/* Left Sidebar */}
        <div className='w-56 h-full bg-gray-100 p-4'>
          {/* Sidebar content */}
          <div className="mb-4 flex flex-col gap-3">
            <div className='flex w-82 border bg-blue-200 align-middle pt-1 pl-2 rounded-md text-blue-600'>
              <div><img src="/calender.png" className='h-10' alt="Calendar" /></div>
              <button className='text-2xl text-center pb-2'>Calendar</button>
            </div>
            <div className='flex items-center'>
              <img src="/Picture.jpg" alt="Profile" className="rounded-full w-10 h-10" />
              <span className="font-semibold ml-2 text-xl">Pavan Shirsat</span>
            </div>
          </div>

          {/* Social media connections */}
          <div className="space-y-4">
            <button className="bg-white w-full text-left py-2 px-2 rounded-md">Connect Facebook</button>
            <button className="bg-white w-full text-left py-2 px-2 rounded-md">Connect Instagram</button>
            <button className="bg-white w-full text-left py-2 px-2 rounded-md">Connect Twitter/X</button>
            <button className="bg-white w-full text-left py-2 px-2 rounded-md">Connect LinkedIn</button>
          </div>

          {/* Other buttons */}
          <div className="mt-6 space-y-4">
            <button className="bg-gray-300 w-full py-2 rounded-md">Manage Tags</button>
            <button className="bg-gray-300 w-full py-2 rounded-md">Manage Channels</button>
          </div>
        </div>

        {/* Calendar section */}
        <div className='flex-1 bg-white h-[600px] overflow-scroll'>
        <FullCalendar
  plugins={[dayGridPlugin]}
  initialView="dayGridMonth"
  selectable={true} // Allow date selection
  select={handleDateClick} // Use 'select' instead of 'dateClick'
  events={events}
  eventClick={handleEventClick}
/>


        </div>
      </div>

      {/* Modal for event details */}
      <Modal
  isOpen={modalIsOpen}
  onRequestClose={closeModal}
  contentLabel="Event Details"
  className="modal-content bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto mt-10 z-50 h-[430px]"
  overlayClassName="modal-overlay fixed inset-0 bg-gray-800 bg-opacity-50 z-40"
>
  {selectedEvent && (
    <div>
      <h2 className="text-2xl font-bold mb-2">{selectedEvent.title}</h2>
      <div className='flex flex-col'>
        <p className=' h-64 flex overflow-scroll flex-col overflow-x-hidden text-ellipsis'>
          <div className=''>
            {selectedEvent.extendedProps.img ? (
              <img src={selectedEvent.extendedProps.img} alt="Event" className="h-26 w-auto mt-4 rounded-lg " onError={(e) => e.target.src = '/fallback-image.jpg'} />
            ) : (
              <img src="/default-image.jpg" alt="Event" className="h-26 w-auto mt-4 rounded-lg" />
            )}
          </div>
          {selectedEvent.extendedProps.info}

        </p>
        <div className='flex mt-5 font-bold roboto gap-7'>
          <div className='flex flex-col'><span className='text-gray-600'>Likes</span><span>  {selectedEvent.extendedProps.like}</span></div>
          <div className='flex flex-col'><span className='text-gray-600'>Comments</span><span>{selectedEvent.extendedProps.comment}</span></div>
          <div className='flex flex-col'><span className='text-gray-600'>Shares</span><span>{selectedEvent.extendedProps.shares}</span></div>
          <div className='flex flex-col'><span className='text-gray-600'>Impressions</span><span>{selectedEvent.extendedProps.impressions}</span></div>
        </div>
      </div>
    </div>
  )}
</Modal>



    </>
  );
};

export default Calendar;
