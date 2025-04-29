import React, { useState } from 'react';
import axios from 'axios';

const AddAttendance = () => {
  const [formData, setFormData] = useState({
    Eid: '',
    Alumni_id: '',
    Did: '',
    Status: 0,
  });

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/attendance', formData);
      setFormData({ Eid: '', Alumni_id: '', Did: '', Status: 0 });  // Reset form
      alert("Attendance added successfully!");
    } catch (err) {
      console.error('Error adding attendance:', err);
      alert("There was an error adding the attendance.");
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Add Event Attendance</h3>

      <form onSubmit={handleSubmit} className="mb-4 border p-3 rounded bg-light">
        <div className="mb-3">
          <label className="form-label">Select Event</label>
          <select
            className="form-select"
            name="Eid"
            value={formData.Eid}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Event --</option>
            {/* Add events dynamically here */}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Select Alumni</label>
          <select
            className="form-select"
            name="Alumni_id"
            value={formData.Alumni_id}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Alumni --</option>
            {/* Add alumni dynamically here */}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Select Department</label>
          <select
            className="form-select"
            name="Did"
            value={formData.Did}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Department --</option>
            {/* Add departments dynamically here */}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Status (0 = Absent, 1 = Present)</label>
          <select
            className="form-select"
            name="Status"
            value={formData.Status}
            onChange={handleChange}
          >
            <option value={0}>Absent</option>
            <option value={1}>Present</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">Add Attendance</button>
      </form>
    </div>
  );
};

export default AddAttendance;
