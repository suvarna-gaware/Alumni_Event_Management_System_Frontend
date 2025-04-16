import React from 'react';
import './Events.css';

const Events = () => {
  const events = [
    {
      id: 1,
      name: "Alumni Meet 2024",
      date: "2024-12-15",
      venue: "Main Auditorium",
      description: "A grand reunion for all alumni to reconnect and celebrate achievements.",
    },
    {
      id: 2,
      name: "Tech Talk & Networking",
      date: "2024-10-10",
      venue: "Conference Hall B",
      description: "Join industry leaders and fellow alumni for an inspiring tech session and networking.",
    },
    {
      id: 3,
      name: "Annual Alumni Sports Day",
      date: "2024-08-05",
      venue: "College Sports Ground",
      description: "A day full of friendly sports events, team-building, and fun for all batches.",
    },
    {
      id: 4,
      name: "Alumni Career Fair",
      date: "2024-09-20",
      venue: "Student Center",
      description: "Explore job opportunities, internships, and career guidance from successful alumni.",
    },
    {
      id: 5,
      name: "Golden Batch Celebration",
      date: "2024-11-03",
      venue: "Heritage Hall",
      description: "Celebrating the 50th anniversary of the 1974 batch with a special evening.",
    },
    {
      id: 6,
      name: "Cultural Reunion Night",
      date: "2024-12-01",
      venue: "Open Amphitheater",
      description: "An evening of music, dance, and cultural performances by alumni and students.",
    },
  ];

  return (
    <div className="events-container">
      <h2 className="events-title">Upcoming Alumni Events</h2>

      <div className="events-grid">
        {events.map((event) => (
          <div key={event.id} className="event-card">
            <h3 className="event-name">{event.name}</h3>
            <p className="event-detail"><strong>Date:</strong> {event.date}</p>
            <p className="event-detail"><strong>Venue:</strong> {event.venue}</p>
            <p className="event-description">{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
