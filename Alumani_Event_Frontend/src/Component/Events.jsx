import React from 'react';
import './Events.css';

const Events = () => {
  const events = [
    {
      id: 1,
      name: "Alumni Meet 2024",
      date: "2024-12-15",
      time: "18:00",
      venue: "Main Auditorium",
      department: "All",
      description: "A grand reunion for all alumni to reconnect and celebrate achievements.",
    },
    {
      id: 2,
      name: "Tech Talk & Networking",
      date: "2024-10-10",
      time: "10:00",
      venue: "Conference Hall B",
      department: "CSE",
      description: "Join industry leaders and fellow alumni for an inspiring tech session and networking.",
    },
    {
      id: 3,
      name: "Annual Alumni Sports Day",
      date: "2024-08-05",
      time: "09:00",
      venue: "College Sports Ground",
      department: "All",
      description: "A day full of friendly sports events, team-building, and fun for all batches.",
    },
   
    {
      id: 4,
      name: "Workshop on AI",
      date: "2025-07-10",
      time: "14:00:00",
      venue: "Main Auditorium",
      department: "MBA",
      description: "An insightful workshop on AI trends, tools, and business applications by industry experts.",
    },
    {
      id: 5,
      name: "Gather",
      date: "2025-05-28",
      time: "14:15:00",
      venue: "Pune",
      department: "MBA",
      description: "An interactive meet-up of MBA alumni and faculty to share experiences and future plans.",
    },
    {
      id: 6,
      name: "Tech Talk",
      date: "2025-05-28",
      time: "14:50:00",
      venue: "Mumbai",
      department: "Mechanical",
      description: "Mechanical alumni and experts discuss innovations and career pathways in tech industries.",
    },
  ];

  return (
    <div className="events-container">
      <h2 className="events-title">Upcoming Alumni Events</h2>

      <div className="events-grid">
        {events.map((event) => (
          <div key={event.id} className="event-card">
            <h3 className="event-name">Event Name: {event.name}</h3>
            <p className="event-detail"><strong>Date:</strong> {event.date}</p>
            <p className="event-detail"><strong>Time:</strong> {event.time}</p>
            <p className="event-detail"><strong>Location:</strong> {event.venue}</p>
            <p className="event-detail"><strong>Department:</strong> {event.department}</p>
            <p className="event-description">{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;