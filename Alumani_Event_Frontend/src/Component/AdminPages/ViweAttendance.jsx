import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ViewAttendance.css';

const ViewAttendance = () => {
  const [attendanceList, setAttendanceList] = useState([]);

  const fetchAttendance = async () => {
    try {
      const response = await axios.get('http://localhost:8766/api/getallAttendance');
      setAttendanceList(response.data);
    } catch (error) {
      console.error('Error fetching attendance:', error);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  return (
    <div className="view-attendance-container">
      <h2>Event Attendance</h2>
      <table className="attendance-table">
        <thead>
          <tr>
            <th>Event Name</th>
            <th>Alumni Name</th>
            <th>Department</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {attendanceList.map((item) => (
            <tr key={`att-${item.Eid}-${item.Alumni_id}-${item.Did}`}>
              <td>{item.eventname}</td>
              <td>{item.alumni_name}</td>
              <td>{item.deptname}</td>
              <td>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewAttendance;
