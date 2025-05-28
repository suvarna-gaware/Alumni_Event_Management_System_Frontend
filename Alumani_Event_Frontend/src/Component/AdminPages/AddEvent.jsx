import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const CreateEvent = () => {
  const location = useLocation();
  const organization = location.state?.organization;

  const [form, setForm] = useState({
    eventname: '',
    passoutYear: '',
    eventdate: '',
    eventtime: '',
    location: ''
  });

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!organization) {
      Swal.fire({
        icon: 'error',
        title: 'Organization info missing',
        text: 'Please login again.',
      });
      return;
    }

    const payload = {
      orgid: organization.orgid,
      deptid: organization.deptid || organization.did,
      eventname: form.eventname,
      passoutYear: parseInt(form.passoutYear),
      eventdate: form.eventdate,
      eventtime: form.eventtime,
      location: form.location
    };

    // Show confirmation dialog
    const result = await Swal.fire({
      title: 'Are you sure?',
      html: `
        <strong>Event:</strong> ${form.eventname}<br/>
        <strong>Passout Year:</strong> ${form.passoutYear}<br/>
        <strong>Date:</strong> ${form.eventdate}<br/>
        <strong>Time:</strong> ${form.eventtime}<br/>
        <strong>Location:</strong> ${form.location}
      `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, create it!',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      try {
        await axios.post('http://localhost:8766/create', payload);
        Swal.fire({
          icon: 'success',
          title: 'Event created successfully!',
          timer: 2000,
          showConfirmButton: false
        });
        setForm({
          eventname: '',
          passoutYear: '',
          eventdate: '',
          eventtime: '',
          location: ''
        });
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error creating event',
          text: error.response?.data?.message || error.message,
        });
        console.error(error);
      }
    } else {
      Swal.fire({
        icon: 'info',
        title: 'Cancelled',
        text: 'Event creation cancelled.',
        timer: 1500,
        showConfirmButton: false
      });
    }
  };

  if (!organization) {
    return (
      <div className="container mt-4" style={{ maxWidth: '600px' }}>
        <h2>Create Event</h2>
        <div className="alert alert-danger">
          Organization info not found. Please access this page from your Organizer panel.
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4" style={{ maxWidth: '600px' }}>
      <h2>Create Event for {organization.orgname || organization.org_name}</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="eventname" className="form-label">Event Name</label>
          <input
            type="text"
            id="eventname"
            name="eventname"
            className="form-control"
            value={form.eventname}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="passoutYear" className="form-label">Passout Year</label>
          <select
            id="passoutYear"
            name="passoutYear"
            className="form-control"
            value={form.passoutYear}
            onChange={handleChange}
            required
          >
            <option value="">Select Year</option>
            {years.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="eventdate" className="form-label">Event Date</label>
          <input
            type="date"
            id="eventdate"
            name="eventdate"
            className="form-control"
            value={form.eventdate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="eventtime" className="form-label">Event Time</label>
          <input
            type="time"
            id="eventtime"
            name="eventtime"
            className="form-control"
            value={form.eventtime}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="location" className="form-label">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            className="form-control"
            value={form.location}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">Create Event</button>
      </form>
    </div>
  );
};

export default CreateEvent;
