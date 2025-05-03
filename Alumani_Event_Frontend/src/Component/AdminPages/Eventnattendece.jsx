import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddAttendance = () => {
  const [formData, setFormData] = useState({
    eventid: '',
    alumniid: '',  
    deptid: '',
    status: 'not attended',
  });

  const [events, setEvents] = useState([]);
  const [alumni, setAlumni] = useState([]);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const fetchDropdowns = async () => {
      try {
        const [eventRes, alumniRes, deptRes] = await Promise.all([
          axios.get('http://localhost:8766/viewAllEvents'),
          axios.get('http://localhost:8766/viewAllAlumni'),
          axios.get('http://localhost:8766/getDepartments'),
        ]);

        setEvents(eventRes.data);
        setAlumni(alumniRes.data);
        setDepartments(deptRes.data);
      } catch (error) {
        console.log('Error fetching dropdown data:', error);
      }
    };

    fetchDropdowns();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      eventid: parseInt(formData.eventid),
      alumniid: parseInt(formData.alumniid),  // Match backend field
      deptid: parseInt(formData.deptid),
      status: formData.status,
    };

    try {
      const response = await fetch('http://localhost:8766/createAttendance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert('Attendance added successfully!');
        setFormData({
          eventid: '',
          alumniid: '',
          deptid: '',
          status: 'not attended',
        });
      } else {
        const errorData = await response.text();
        console.error('Server error:', errorData);
        alert('Failed to add attendance.');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      alert('Network or server error occurred.');
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Add Event Attendance</h3>
      <form onSubmit={handleSubmit} className="border p-4 rounded bg-light shadow-sm">
        
        {/* Event Dropdown */}
        <div className="mb-3">
          <label className="form-label">Select Event</label>
          <select
            className="form-select"
            name="eventid"
            value={formData.eventid}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Event --</option>
            {events.map((event) => (
              <option key={event.eventid} value={event.eventid}>
                {event.eventname}
              </option>
            ))}
          </select>
        </div>

        {/* Alumni Dropdown */}
        <div className="mb-3">
          <label className="form-label">Select Alumni</label>
          <select
            className="form-select"
            name="alumniid" // lowercase
            value={formData.alumniid}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Alumni --</option>
            {alumni.map((a) => (
              <option key={a.alumniid} value={a.alumniid}>
                {a.name}
              </option>
            ))}
          </select>
        </div>

        {/* Department Dropdown */}
        <div className="mb-3">
          <label className="form-label">Select Department</label>
          <select
            className="form-select"
            name="deptid"
            value={formData.deptid}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Department --</option>
            {departments.map((d) => (
              <option key={d.deptid} value={d.deptid}>
                {d.deptname}
              </option>
            ))}
          </select>
        </div>

        {/* Status Dropdown */}
        <div className="mb-3">
          <label className="form-label">Status</label>
          <select
            className="form-select"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="not attended">Not Attended</option>
            <option value="attended">Attended</option>
          </select>
        </div>

        <button type="submit" className="btn btn-success w-100">
          Submit Attendance
        </button>
      </form>
    </div>
  );
};

export default AddAttendance;
