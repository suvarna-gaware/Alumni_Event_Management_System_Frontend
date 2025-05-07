import { useState, useEffect } from "react";
import "./ViewEvents.css";
import { FaSearch, FaEdit, FaTrashAlt } from "react-icons/fa";
import Swal from 'sweetalert2'; 

function ViewEvent() {
  const [events, setEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [editEvent, setEditEvent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState("upcoming");

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchName.trim() === "") {
        fetchEvents();
      } else {
        handleSearchByName(searchName.trim());
      }
    }, 400);
    return () => clearTimeout(delayDebounce);
  }, [searchName]);

  const splitEvents = (eventList) => {
    const today = new Date().toISOString().split("T")[0];
    const upcoming = eventList.filter((event) => event.eventdate >= today);
    const past = eventList.filter((event) => event.eventdate < today);
    setUpcomingEvents(upcoming);
    setPastEvents(past);
  };

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8766/getevents");
      if (!res.ok) throw new Error("Failed to fetch events");
      const data = await res.json();
      setEvents(data);
      splitEvents(data);
    } catch (err) {
      console.error("Fetch error:", err);
      setEvents([]);
      setUpcomingEvents([]);
      setPastEvents([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchByName = async (name) => {
    try {
      const res = await fetch(`http://localhost:8766/searchEventByName/${name}`);
      if (!res.ok) throw new Error("Search fetch failed");
      const data = await res.json();
      const filtered = Array.isArray(data) ? data : [data];
      setEvents(filtered);
      splitEvents(filtered);
    } catch (err) {
      console.error("Search error:", err);
      setEvents([]);
      setUpcomingEvents([]);
      setPastEvents([]);
    }
  };

  const handleDelete = async (id) => {
    // Using SweetAlert for confirmation before deletion
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(`http://localhost:8766/deleteEvent/${id}`, {
          method: "DELETE",
        });
        const msg = await res.text();
        Swal.fire("Deleted!", msg, "success");
        fetchEvents();
      } catch (err) {
        console.error("Delete error:", err);
        Swal.fire("Error!", "There was an error deleting the event.", "error");
      }
    }
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch(`http://localhost:8766/updateEvent/${editEvent.eventid}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editEvent),
      });
      const msg = await res.text();
      Swal.fire("Updated!", msg, "success");
      setEditEvent(null);
      fetchEvents();
    } catch (err) {
      console.error("Update error:", err);
      Swal.fire("Error!", "There was an error updating the event.", "error");
    }
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
        <button className="edit-button" onClick={() => setEditEvent(event)}>
          <FaEdit /> Edit
        </button>
        <button className="delete-button" onClick={() => handleDelete(event.eventid)}>
          <FaTrashAlt /> Delete
        </button>
      </div>
    </div>
  );

  return (
    <div className="view-event-container">
      <h2>Manage Events</h2>

      <div className="modern-search-box">
        <FaSearch className="modern-search-icon" />
        <input
          type="text"
          className="modern-search-input"
          placeholder="Search by Event Name..."
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
      </div>

      {editEvent && (
        <div className="edit-section">
          <h4>Edit Event (ID: {editEvent.eventid})</h4>
          <input
            value={editEvent.eventname}
            onChange={(e) => setEditEvent({ ...editEvent, eventname: e.target.value })}
            placeholder="Event Name"
          />
          <input
            type="date"
            value={editEvent.eventdate}
            onChange={(e) => setEditEvent({ ...editEvent, eventdate: e.target.value })}
          />
          <input
            type="time"
            value={editEvent.eventtime}
            onChange={(e) => setEditEvent({ ...editEvent, eventtime: e.target.value })}
          />
          <input
            value={editEvent.location}
            onChange={(e) => setEditEvent({ ...editEvent, location: e.target.value })}
            placeholder="Location"
          />
          <input
            type="number"
            value={editEvent.deptid}
            onChange={(e) => setEditEvent({ ...editEvent, deptid: e.target.value })}
            placeholder="Department ID"
          />
          <div className="edit-buttons">
            <button onClick={handleUpdate}><FaEdit /> Update</button>
            <button className="cancel-btn" onClick={() => setEditEvent(null)}>Cancel</button>
          </div>
        </div>
      )}

      <div className="tabs">
        <button className={selectedTab === "upcoming" ? "tab active" : "tab"} onClick={() => setSelectedTab("upcoming")}>
          Upcoming Events ({upcomingEvents.length})
        </button>
        <button className={selectedTab === "past" ? "tab active" : "tab"} onClick={() => setSelectedTab("past")}>
          Past Events ({pastEvents.length})
        </button>
      </div>

      <h3>{selectedTab === "upcoming" ? "These are Upcoming Events" : "These are Past Events"}</h3>

      <div className="event-list">
        {loading ? (
          <p>Loading...</p>
        ) : selectedTab === "upcoming" ? (
          upcomingEvents.length > 0 ? upcomingEvents.map(renderEventCard) : <p>No upcoming events.</p>
        ) : (
          pastEvents.length > 0 ? pastEvents.map(renderEventCard) : <p>No past events.</p>
        )}
      </div>
    </div>
  );
}

export default ViewEvent;
