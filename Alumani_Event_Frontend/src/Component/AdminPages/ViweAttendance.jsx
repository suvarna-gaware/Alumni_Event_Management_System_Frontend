import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ViewAttendance.css';

const ViewAttendance = () => {
  const [attendanceList, setAttendanceList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState({
    eventid: '',
    alumni_name: '',
    deptname: '',
    status: 'not attended',
  });

  // Fetch all attendance records from the backend
  const fetchAttendance = async () => {
    try {
      const response = await axios.get('http://localhost:8766/getallAttendance');
      setAttendanceList(response.data);
    } catch (error) {
      console.error('Error fetching attendance:', error);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  // Delete attendance record based on ID
  const deleteAttendance = async (id) => {
    try {
      const url = `http://localhost:8766/deleteAttendance/${id}`;
      await axios.delete(url); // Send DELETE request with the ID
      fetchAttendance(); // Re-fetch the attendance list after deletion
    } catch (error) {
      console.error('Error deleting attendance:', error);
    }
  };

  // Update the attendance record
  const handleUpdate = async () => {
    try {
      await axios.put('http://localhost:8766/updateAttendance', editData);
      setEditIndex(null);
      fetchAttendance(); // Re-fetch the updated list after updating
    } catch (error) {
      console.error('Error updating attendance:', error);
    }
  };

  return (
    <div className="view-attendance-container">
      <h2>Event Attendance</h2>
      <table className="attendance-table">
        <thead>
          <tr>
            <th>Event ID</th>
            <th>Alumni Name</th>
            <th>Department</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {attendanceList.map((item, index) => (
            <tr key={`${item.Eid}-${item.alumni_name}-${item.deptname}`}>
              {editIndex === index ? (
                <>
                  <td>{item.Eid}</td>
                  <td>{item.alumni_name}</td>
                  <td>{item.deptname}</td>
                  <td>
                    <select
                      value={editData.status}
                      onChange={(e) =>
                        setEditData({ ...editData, status: e.target.value })
                      }
                    >
                      <option value="attended">Attended</option>
                      <option value="not attended">Not Attended</option>
                    </select>
                  </td>
                  <td>
                    <button onClick={handleUpdate} style={{ background: 'green', color: 'white' }}>
                      Save
                    </button>
                    <button onClick={() => setEditIndex(null)} style={{ background: 'red', color: 'white' }}>
                      Cancel
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td>{item.Eid}</td>
                  <td>{item.alumni_name}</td>
                  <td>{item.deptname}</td>
                  <td>{item.status}</td>
                  <td>
                    <button
                      onClick={() => {
                        setEditIndex(index);
                        setEditData({
                          eventid: item.Eid,
                          alumni_name: item.alumni_name,
                          deptname: item.deptname,
                          status: item.status,
                        });
                      }}
                      style={{ background: 'blue', color: 'white' }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteAttendance(item.Eid)} // Using Eid as the unique ID
                      style={{ background: 'red', color: 'white' }}
                    >
                      Delete
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewAttendance;
