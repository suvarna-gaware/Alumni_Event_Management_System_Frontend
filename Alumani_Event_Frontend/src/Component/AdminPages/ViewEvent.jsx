import { useState, useEffect } from "react";
import "./ViewEvents.css";
import { FaSearch, FaEdit, FaTrashAlt } from "react-icons/fa";

function ViewEvent() {
  const [events, setEvents] = useState([]);
  const [searchId, setSearchName] = useState("");
  const [editEvent, setEditEvent] = useState({
    eid: "",
    orgid: "",
    ename: "",
    dates: "",
    description: "",
    venue: "",
  });
  const [loading,setLoading]=useState(false);
  const [isSearching, setIsSearching] = useState(false);

  // useEffect(() => {
  //   fetchEvents();
  // }, []);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8766/viewAllEvents");
      const data = await res.json();
      setEvents(data);
      setIsSearching(false);
    } catch (err) {
      console.error("Fetch error:", err);
      setEvents([]);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this event?")) return;
    const res = await fetch(`http://localhost:8766/deleteEvet/${id}`, {
      method: "DELETE",
    });
    const msg = await res.text();
    alert(msg);
    fetchEvents();
  };

  const handleSearch = async () => {
    if (!searchId) return;
    try {
      const res = await fetch(`http://localhost:8766/searchEventById/${searchId}`);
      const data = await res.json();
      setEvents([data]);
      setIsSearching(true);
    } catch (err) {
      alert("Event not found.");
      setEvents([]);
    }
  };

  const handleReset = () => {
    setSearchId("");
    fetchEvents();
  };

  const handleUpdate = async () => {
    const res = await fetch(`http://localhost:8766/updateEvent/${editEvent.eid}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editEvent),
    });
    const msg = await res.text();
    alert(msg);
    setEditEvent({
      eid: "",
      orgid: "",
      ename: "",
      dates: "",
      description: "",
      venue: "",
    });
    fetchEvents();
  };

  return (
    <div className="view-event-container">
      <h2>Manage Events</h2>

     {/* Modern Search Section */}
<div className="modern-search-wrapper">
  <div className="modern-search-box">
    <FaSearch className="modern-search-icon" />
    <input
      type="text"
      className="modern-search-input"
      placeholder="Search by Event ID..."
      value={searchId}
      onChange={(e) => setSearchId(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && handleSearch()}
    />
  </div>
  <button onClick={handleSearch} className="modern-search-btn">Search</button>
  {isSearching && (
    <button onClick={handleReset} className="modern-reset-btn">Reset</button>
  )}
</div>


      {/* Edit Form */}
      {editEvent?.eid && (
        <div className="edit-section">
          <h4>Edit Event (ID: {editEvent.eid})</h4>
          <input
            value={editEvent.ename}
            onChange={(e) => setEditEvent({ ...editEvent, ename: e.target.value })}
            placeholder="Event Name"
          />
          <input
            type="date"
            value={editEvent.dates}
            onChange={(e) => setEditEvent({ ...editEvent, dates: e.target.value })}
          />
          <input
            value={editEvent.venue}
            onChange={(e) => setEditEvent({ ...editEvent, venue: e.target.value })}
            placeholder="Venue"
          />
          <input
            value={editEvent.description}
            onChange={(e) => setEditEvent({ ...editEvent, description: e.target.value })}
            placeholder="Description"
          />
          <input
            type="number"
            value={editEvent.orgid}
            onChange={(e) => setEditEvent({ ...editEvent, orgid: e.target.value })}
            placeholder="Organization ID"
          />
          <div className="edit-buttons">
            <button onClick={handleUpdate}>
              <FaEdit /> Update
            </button>
            <button
              className="cancel-btn"
              onClick={() =>
                setEditEvent({
                  eid: "",
                  orgid: "",
                  ename: "",
                  dates: "",
                  description: "",
                  venue: "",
                })
              }
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Event Cards List */}
      <h3>Event List</h3>
      <div className="event-list">
        {events.map((event) => (
          <div key={event.eid} className="event-card">
            <div className="event-field">
              <label>ID:</label>
              <span>{event.eid}</span>
            </div>
            <div className="event-field">
              <label>Event Name:</label>
              <span>{event.ename}</span>
            </div>
            <div className="event-field">
              <label>Date:</label>
              <span>{event.dates}</span>
            </div>
            <div className="event-field">
              <label>Venue:</label>
              <span>{event.venue}</span>
            </div>
            <div className="event-field">
              <label>Description:</label>
              <span>{event.description}</span>
            </div>
            <div className="event-field">
              <label>Organization ID:</label>
              <span>{event.orgid}</span>
            </div>
            <div className="event-actions">
              <button
                className="edit-button"
                onClick={() => setEditEvent(event)}
              >
                <FaEdit /> Edit
              </button>
              <button
                className="delete-button"
                onClick={() => handleDelete(event.eid)}
              >
                <FaTrashAlt /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewEvent;
