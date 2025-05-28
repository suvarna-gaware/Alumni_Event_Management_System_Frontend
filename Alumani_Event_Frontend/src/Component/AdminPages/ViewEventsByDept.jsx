
/*
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const ViewEventsByDept = ({ organization }) => {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editEvent, setEditEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const deptId = organization?.deptid;

  useEffect(() => {
    if (deptId) fetchEvents();
  }, [deptId]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:8766/department/${deptId}`);
      console.log(response.data)
      setEvents(response.data);
    } catch (err) {
      setError('Failed to fetch events');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This event will be permanently deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:8766/deleteEvent/${id}`);
        await fetchEvents();
        Swal.fire('Deleted!', 'The event has been deleted.', 'success');
      } catch (err) {
        Swal.fire('Error!', 'Failed to delete event.', 'error');
      }
    }
  };

  const handleEdit = (event) => {
    setEditEvent({ ...event });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:8766/updateEvent/${editEvent.eventid}`, editEvent);
      setEditEvent(null);
      await fetchEvents();
      Swal.fire('Updated!', 'The event has been updated successfully.', 'success');
    } catch (err) {
      Swal.fire('Error!', 'Failed to update event.', 'error');
    }
  };

  const filteredEvents = events.filter(event =>
    event.eventname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container mt-3">
      <h2 className="text-center mb-4 text-primary">Department Events</h2>

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search by event name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {filteredEvents.length === 0 ? (
        <p className="text-warning">No events found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead className="table-dark">
              <tr>
                <th>Event ID</th>
                <th>Event Name</th>
                <th>Date</th>
                <th>Time</th>
                <th>Location</th>
                <th>Actions</th>
                 <th>Send Email</th>
              </tr>
            </thead>
            <tbody>
              {filteredEvents.map(event => (
                <tr key={event.eventid}>
                  <td>{event.eventid}</td>
                  <td>{event.eventname}</td>
                  <td>{event.eventdate}</td>
                  <td>{event.eventtime}</td>
                  <td>{event.location}</td>
                  <td>
                    <button className="btn btn-danger btn-sm me-2" onClick={() => handleDelete(event.eventid)}>
                      Delete
                    </button>
                    <button className="btn btn-primary btn-sm" onClick={() => handleEdit(event)}>
                      Edit
                    </button>

                    
                  </td>
                    <button className="btn btn-primary btn-sm" onClick={() => handleEmail(event)}>Send Email
                    </button>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editEvent && (
        <div className="mt-4">
          <h5>Edit Event</h5>
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Event Name"
            value={editEvent.eventname}
            onChange={(e) => setEditEvent({ ...editEvent, eventname: e.target.value })}
          />
          <input
            type="date"
            className="form-control mb-2"
            value={editEvent.eventdate}
            onChange={(e) => setEditEvent({ ...editEvent, eventdate: e.target.value })}
          />
          <input
            type="time"
            className="form-control mb-2"
            value={editEvent.eventtime}
            onChange={(e) => setEditEvent({ ...editEvent, eventtime: e.target.value })}
          />
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Location"
            value={editEvent.location}
            onChange={(e) => setEditEvent({ ...editEvent, location: e.target.value })}
          />
          <button className="btn btn-success me-2" onClick={handleUpdate}>Update</button>
          <button className="btn btn-secondary" onClick={() => setEditEvent(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default ViewEventsByDept;

*/



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const ViewEventsByDept = ({ organization }) => {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editEvent, setEditEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const deptId = organization?.deptid;

  useEffect(() => {
    if (deptId) fetchEvents();
  }, [deptId]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:8766/department/${deptId}`);
      setEvents(response.data);
    } catch (err) {
      setError('Failed to fetch events');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This event will be permanently deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:8766/deleteEvent/${id}`);
        await fetchEvents();
        Swal.fire('Deleted!', 'The event has been deleted.', 'success');
      } catch (err) {
        Swal.fire('Error!', 'Failed to delete event.', 'error');
      }
    }
  };

  const handleEdit = (event) => {
    setEditEvent({ ...event });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:8766/updateEvent/${editEvent.eventid}`, editEvent);
      setEditEvent(null);
      await fetchEvents();
      Swal.fire('Updated!', 'The event has been updated successfully.', 'success');
    } catch (err) {
      Swal.fire('Error!', 'Failed to update event.', 'error');
    }
  };

  const handleEmail = async (event) => {
    try {
      const alumniResponse = await axios.get(`http://localhost:8766/alumni/by-dept/${deptId}`);
      const alumniList = alumniResponse.data;

      const requestBody = { alumniList };

      const result = await axios.post('http://localhost:8766/email/send-alumni', requestBody);

      Swal.fire('Success', result.data, 'success');
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'Failed to send emails to alumni.', 'error');
    }
  };

  const filteredEvents = events.filter(event =>
    event.eventname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container mt-3">
      <h2 className="text-center mb-4 text-primary">Department Events</h2>

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search by event name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {filteredEvents.length === 0 ? (
        <p className="text-warning">No events found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead className="table-dark">
              <tr>
                <th>Event ID</th>
                <th>Event Name</th>
                <th>Date</th>
                <th>Time</th>
                <th>Location</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEvents.map(event => (
                <tr key={event.eventid}>
                  <td>{event.eventid}</td>
                  <td>{event.eventname}</td>
                  <td>{event.eventdate}</td>
                  <td>{event.eventtime}</td>
                  <td>{event.location}</td>
                  <td>
                    <button className="btn btn-danger btn-sm me-2" onClick={() => handleDelete(event.eventid)}>
                      Delete
                    </button>
                    <button className="btn btn-primary btn-sm me-2" onClick={() => handleEdit(event)}>
                      Edit
                    </button>
                    <button className="btn btn-success btn-sm" onClick={() => handleEmail(event)}>
                      Send Email
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editEvent && (
        <div className="mt-4">
          <h5>Edit Event</h5>
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Event Name"
            value={editEvent.eventname}
            onChange={(e) => setEditEvent({ ...editEvent, eventname: e.target.value })}
          />
          <input
            type="date"
            className="form-control mb-2"
            value={editEvent.eventdate}
            onChange={(e) => setEditEvent({ ...editEvent, eventdate: e.target.value })}
          />
          <input
            type="time"
            className="form-control mb-2"
            value={editEvent.eventtime}
            onChange={(e) => setEditEvent({ ...editEvent, eventtime: e.target.value })}
          />
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Location"
            value={editEvent.location}
            onChange={(e) => setEditEvent({ ...editEvent, location: e.target.value })}
          />
          <button className="btn btn-success me-2" onClick={handleUpdate}>Update</button>
          <button className="btn btn-secondary" onClick={() => setEditEvent(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default ViewEventsByDept;


//--------------------------------

/*
import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const ViewEventsByDept = ({ deptId }) => {
  const [events, setEvents] = useState([]);

  // Fetch events when deptId changes
  useEffect(() => {
    if (deptId) {
      fetchEvents();
    }
  }, [deptId]);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`http://localhost:8766/department/${deptId}`);
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
      Swal.fire("Error", "Failed to fetch events", "error");
    }
  };

  // Send email to all alumni in department
  const sendEmailsToAlumni = async () => {
    try {
      const alumniRes = await axios.get(`http://localhost:8766/alumni/by-dept/${deptId}`);
      const alumniList = alumniRes.data;

      const emailRes = await axios.post("http://localhost:8766/email/send-alumni", {
        deptid: deptId,
        alumniList: alumniList,
      });

      Swal.fire("Success", "Emails sent to alumni!", "success");
    } catch (error) {
      console.error("Error sending emails:", error);
      Swal.fire("Error", "Failed to send emails", "error");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Events for Department ID: {deptId}</h2>

      <button className="btn btn-success mb-3" onClick={sendEmailsToAlumni}>
        Send Email to Alumni
      </button>

      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>Event ID</th>
            <th>Organizer ID</th>
            <th>Event Name</th>
            <th>Date</th>
            <th>Time</th>
            <th>Location</th>
          
           
          </tr>
        </thead>
        <tbody>
          {events.length > 0 ? (
            events.map((event) => (
              <tr key={event.eventid}>
                <td>{event.eventid}</td>
                <td>{event.orgid}</td>
                <td>{event.ename}</td>
                <td>{event.event_date}</td>
                <td>{event.event_time}</td>
                <td>{event.venue}</td>
                
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => sendEmailsToEvent(event.eventid)}
                  >
                    Email Alumni
                  </button>
                </td>
                }
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No events found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ViewEventsByDept;
*/