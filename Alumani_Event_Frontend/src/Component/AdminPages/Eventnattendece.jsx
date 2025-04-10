import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EventAttendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [formData, setFormData] = useState({
    Eid: '',
    Alumni_id: '',
    Did: '',
    Status: 0,
  });

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/attendance'); // update your backend URL accordingly
      setAttendanceData(res.data);
    } catch (err) {
      console.error('Error fetching attendance data:', err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/attendance', formData);
      fetchAttendance();
      setFormData({ Eid: '', Alumni_id: '', Did: '', Status: 0 });
    } catch (err) {
      console.error('Error adding attendance:', err);
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Event Attendance</h3>

      <form onSubmit={handleSubmit} className="mb-4 border p-3 rounded bg-light">
        <div className="mb-3">
          <label className="form-label">Event ID (Eid)</label>
          <input type="number" className="form-control" name="Eid" value={formData.Eid} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Alumni ID</label>
          <input type="number" className="form-control" name="Alumni_id" value={formData.Alumni_id} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Department ID (Did)</label>
          <input type="number" className="form-control" name="Did" value={formData.Did} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Status (0 = Absent, 1 = Present)</label>
          <select className="form-select" name="Status" value={formData.Status} onChange={handleChange}>
            <option value={0}>Absent</option>
            <option value={1}>Present</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Add Attendance</button>
      </form>

      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Fid</th>
            <th>Event ID</th>
            <th>Alumni ID</th>
            <th>Department ID</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.map((entry) => (
            <tr key={entry.Fid}>
              <td>{entry.Fid}</td>
              <td>{entry.Eid}</td>
              <td>{entry.Alumni_id}</td>
              <td>{entry.Did}</td>
              <td>{entry.Status === 1 ? 'Present' : 'Absent'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventAttendance;
