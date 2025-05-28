import { useState, useEffect } from "react";
import "./ViewEvents.css";
import { FaSearch, FaEdit, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

function ViewEvent() {
  const [events, setEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [editEvent, setEditEvent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState("upcoming");

  useEffect(() => {
    fetchEvents();
    fetchDepartments();
  }, []);

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (searchName.trim() === "") fetchEvents();
      else handleSearchByName(searchName.trim());
    }, 400);
    return () => clearTimeout(debounce);
  }, [searchName]);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8766/getevents");
      const data = await res.json();
      setEvents(data);
      splitEvents(data);
    } catch {
      setEvents([]);
      setUpcomingEvents([]);
      setPastEvents([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchDepartments = async () => {
    try {
      const res = await fetch("http://localhost:8766/getDepartments");
      const data = await res.json();
      setDepartments(data);
    } catch {
      setDepartments([]);
    }
  };

  const splitEvents = (data) => {
    const today = new Date().toISOString().split("T")[0];
    const upcoming = data.filter((e) => e.eventdate >= today);
    const past = data.filter((e) => e.eventdate < today);
    setUpcomingEvents(upcoming);
    setPastEvents(past);
  };

  const handleSearchByName = async (name) => {
    try {
      const res = await fetch(`http://localhost:8766/searchEventByName/${name}`);
      const data = await res.json();
      const results = Array.isArray(data) ? data : [data];
      setEvents(results);
      splitEvents(results);
    } catch {
      setEvents([]);
      setUpcomingEvents([]);
      setPastEvents([]);
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This event will be deleted permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await fetch(`http://localhost:8766/deleteEvent/${id}`, {
          method: "DELETE",
        });
        const msg = await res.text();
        Swal.fire("Deleted!", msg, "success");
        fetchEvents();
      } catch {
        Swal.fire("Error!", "Failed to delete event.", "error");
      }
    }
  };

  const handleUpdate = async () => {
    const { eventname, eventdate, eventtime, location, deptid, eventid } =
      editEvent;

    if (!eventname || !eventdate || !eventtime || !location || !deptid) {
      Swal.fire("Warning", "Please fill in all fields.", "warning");
      return;
    }

    try {
      const res = await fetch(`http://localhost:8766/updateEvent/${eventid}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editEvent),
      });
      const msg = await res.text();
      Swal.fire("Success", msg, "success");
      setEditEvent(null);
      fetchEvents();
    } catch {
      Swal.fire("Error!", "Failed to update event.", "error");
    }
  };

  const getDepartmentName = (deptid) => {
    const dept = departments.find((d) => d.did === deptid || d.Did === deptid);
    return dept?.dname || dept?.Dname || dept?.deptname || "Unknown";
  };

  const renderEventCard = (event) => (
    <div key={event.eventid} className="event-card">
      <div><strong>{event.eventname}</strong></div>
      <p>Date: {event.eventdate}</p>
      <p>Time: {event.eventtime}</p>
      <p>Location: {event.location}</p>
      <p>Department: {getDepartmentName(event.deptid)}</p>
      <div className="event-actions">
        <button onClick={() => setEditEvent(event)} className="edit-button">
          <FaEdit /> Edit
        </button>
        <button onClick={() => handleDelete(event.eventid)} className="delete-button">
          <FaTrashAlt /> Delete
        </button>
      </div>
    </div>
  );

  return (
    <div className="view-event-container">
      <h2>Manage Events</h2>

      {/* Search */}
      <div className="search-bar">
        <FaSearch />
        <input
          type="text"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          placeholder="Search by Event Name..."
        />
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button
          className={selectedTab === "upcoming" ? "active" : ""}
          onClick={() => setSelectedTab("upcoming")}
        >
          Upcoming ({upcomingEvents.length})
        </button>
        <button
          className={selectedTab === "past" ? "active" : ""}
          onClick={() => setSelectedTab("past")}
        >
          Past ({pastEvents.length})
        </button>
      </div>

      {/* Event List */}
      <div className="event-list">
        {loading ? (
          <p>Loading...</p>
        ) : selectedTab === "upcoming" ? (
          upcomingEvents.map(renderEventCard)
        ) : (
          pastEvents.map(renderEventCard)
        )}
      </div>

      {/* Edit Modal */}
      {editEvent && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>Edit Event</h3>
            <input
              type="text"
              value={editEvent.eventname}
              onChange={(e) =>
                setEditEvent({ ...editEvent, eventname: e.target.value })
              }
              placeholder="Event Name"
            />
            <input
              type="date"
              value={editEvent.eventdate}
              onChange={(e) =>
                setEditEvent({ ...editEvent, eventdate: e.target.value })
              }
            />
            <input
              type="time"
              value={editEvent.eventtime}
              onChange={(e) =>
                setEditEvent({ ...editEvent, eventtime: e.target.value })
              }
            />
            <input
              type="text"
              value={editEvent.location}
              onChange={(e) =>
                setEditEvent({ ...editEvent, location: e.target.value })
              }
              placeholder="Location"
            />
            <select
              value={editEvent.deptid || ""}
              onChange={(e) =>
                setEditEvent({
                  ...editEvent,
                  deptid: parseInt(e.target.value),
                })
              }
            >
              <option value="">Select Department</option>
              {departments.map((d) => (
                <option key={d.did} value={d.did}>
                  {d.dname}
                </option>
              ))}
            </select>
            <div className="modal-buttons">
              <button className="update-button" onClick={handleUpdate}>
                Update
              </button>
              <button className="cancel-button" onClick={() => setEditEvent(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewEvent;
