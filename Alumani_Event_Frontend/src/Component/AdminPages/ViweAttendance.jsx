import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ViewAttendance.css';

const ViewAttendance = () => {
  const [attendanceList, setAttendanceList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState({
    eventid: '',
    alumni_id: '',
    deptid: '',
    status: 'not attended',
  });

  // Fetch attendance data
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

  // Delete attendance
  const deleteAttendance = async (fid) => {
    try {
      await axios.delete(`http://localhost:8766/deleteAttendance/${fid}`);
      fetchAttendance();
    } catch (error) {
      console.error('Error deleting attendance:', error);
    }
  };

  // Update attendance (POST/PUT without fid in URL)
  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:8766/updateAttendance`, editData); // fid removed from URL
      setEditIndex(null);
      fetchAttendance();
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
            <th>Event Name</th>
            <th>Alumni Name</th>
            <th>Department</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {attendanceList.map((item, index) => (
            <tr key={`att-${item.Eid}-${item.Alumni_id}-${item.Did}`}>
              {editIndex === index ? (
                <>
                  <td>{item.eventname}</td>
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
                    <button
                      onClick={handleUpdate}
                      style={{ backgroundColor: 'green', color: 'white', marginRight: '5px' }}
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditIndex(null)}
                      style={{ backgroundColor: 'gray', color: 'white' }}
                    >
                      Cancel
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td>{item.eventname}</td>
                  <td>{item.alumni_name}</td>
                  <td>{item.deptname}</td>
                  <td>{item.status}</td>
                  <td>
                    <button
                      onClick={() => {
                        setEditIndex(index);
                        setEditData({
                          eventid: item.Eid,
                          alumni_id: item.Alumni_id,
                          deptid: item.Did,
                          status: item.status,
                        });
                      }}
                      style={{ backgroundColor: 'blue', color: 'white', marginRight: '5px' }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteAttendance(item.fid)}
                      style={{ backgroundColor: 'red', color: 'white' }}
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
