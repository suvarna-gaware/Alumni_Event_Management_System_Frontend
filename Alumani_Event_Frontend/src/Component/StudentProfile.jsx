import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './StudentProfile.css';

function StudentProfile() {
  const location = useLocation();
  const initialData = location.state?.alumni;
  const [alumniData, setAlumniData] = useState(initialData);
  const [departments, setDepartments] = useState([]);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const res = await fetch("http://localhost:8766/getDepartments");
      const data = await res.json();
      setDepartments(data);
    } catch (err) {
      console.error("Error fetching departments:", err);
    }
  };

  const getDepartmentName = (deptid) => {
    const dept = departments.find((d) => d.deptid === deptid);
    return dept ? dept.deptname : "N/A";
  };

  const handleChange = (e) => {
    setAlumniData({ ...alumniData, [e.target.name]: e.target.value });
    
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch("http://localhost:8766/updateAlumni", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(alumniData)
      });

      if (res.ok) {
        alert("Profile updated successfully!");
        setEditMode(false); // Exit edit mode
      } else {
        alert("Failed to update profile.");
      }
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  return (
    <div className="student-profile-container">
      <h2>🎓 Alumni Profile</h2>
      {alumniData ? (
        <>
          {!editMode ? (
            <div>
              <p><strong>Alumni ID:</strong> {alumniData.alumniid}</p>
              <p><strong>Department:</strong> {getDepartmentName(alumniData.deptid)}</p>
              <p><strong>Name:</strong> {alumniData.name}</p>
              <p><strong>Gender:</strong> {alumniData.gender}</p>
              <p><strong>Passout Year:</strong> {alumniData.year}</p>
              <p><strong>Address:</strong> {alumniData.address}</p>
              <p><strong>Email:</strong> {alumniData.email}</p>
              <p><strong>Contact:</strong> {alumniData.contact}</p>
              <p><strong>Status:</strong> {alumniData.status}</p>

              <button onClick={() => setEditMode(true)}>✏️ Edit Profile</button>
            </div>
          ) : (
            <div className="profile-form">
              <label>Name: <input name="name" value={alumniData.name} onChange={handleChange} /></label>
              <label>Gender:
                <select name="gender" value={alumniData.gender} onChange={handleChange}>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </label>
              <label>Passout Year: <input name="year" value={alumniData.year} onChange={handleChange} /></label>
              <label>Department:
                <select name="deptid" value={alumniData.deptid} onChange={handleChange}>
                  {departments.map((d) => (
                    <option key={d.deptid} value={d.deptid}>{d.deptname}</option>
                  ))}
                </select>
              </label>
              <label>Address: <input name="address" value={alumniData.address} onChange={handleChange} /></label>
              <label>Email: <input name="email" value={alumniData.email} onChange={handleChange} /></label>
              <label>Contact: <input name="contact" value={alumniData.contact} onChange={handleChange} /></label>
              <label>Status:
                <select name="status" value={alumniData.status} onChange={handleChange}>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </label>

              <button onClick={handleUpdate}>💾 Save</button>
              <button onClick={() => setEditMode(false)} style={{ marginLeft: '10px' }}>❌ Cancel</button>
            </div>
          )}
        </>
      ) : (
        <p className="no-data">No alumni data available.</p>
      )}
    </div>
  );
}

export default StudentProfile;
