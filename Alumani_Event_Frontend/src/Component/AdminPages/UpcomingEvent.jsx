import { useEffect, useState } from "react";
import "./ViewEvents.css";
import { FaSearch } from "react-icons/fa";
import Swal from "sweetalert2";

function UpcomingEvent() {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  
  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8766/getevents");
      if (!res.ok) throw new Error("Failed to fetch events");
      const data = await res.json();

      const today = new Date().toISOString().split("T")[0];
      const upcoming = data.filter((event) => event.eventdate >= today);
      setEvents(upcoming);
    } catch (err) {
      console.error("Fetch error:", err);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Filtered events by name
  const filteredEvents = events.filter((event) =>
    event.eventname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleApply = (eventid) => {
    Swal.fire("Applied!", `You have applied for event ID: ${eventid}`, "success");
  };

  const renderEventCard = (event) => (
    <div key={event.eventid} className="event-card">
      {/* Remove the event ID display */}
      <div className="event-field"><label>Event Name:</label><span>{event.eventname}</span></div>
      <div className="event-field"><label>Date:</label><span>{event.eventdate}</span></div>
      <div className="event-field"><label>Time:</label><span>{event.eventtime}</span></div>
      <div className="event-field"><label>Location:</label><span>{event.location}</span></div>
      <div className="event-field"><label>Department:</label><span>{event.deptname || event.deptid}</span></div>
      <div className="event-actions">
        <button className="apply-button" onClick={() => handleApply(event.eventid)}>
          Apply
        </button>
      </div>
    </div>
  );

  return (
    <div className="view-event-container">
      <h2>Upcoming Events</h2>

      <div className="modern-search-box">
        <FaSearch className="modern-search-icon" />
        <input
          type="text"
          className="modern-search-input"
          placeholder="Search by Event Name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="event-list">
        {loading ? (
          <p>Loading...</p>
        ) : filteredEvents.length > 0 ? (
          filteredEvents.map(renderEventCard)
        ) : (
          <p>No upcoming events found.</p>
        )}
      </div>
    </div>
  );
}

export default UpcomingEvent;
