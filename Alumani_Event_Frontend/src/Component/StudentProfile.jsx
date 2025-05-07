import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './StudentProfile.css';

function StudentProfile() {
  const location = useLocation();
  const alumniData = location.state?.alumni;
  const [departments, setDepartments] = useState([]);

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

  return (
    <div className="student-profile-container">
      <h2>🎓 Alumni Profile</h2>
      {alumniData ? (
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
        </div>
      ) : (
        <p className="no-data">No alumni data available.</p>
      )}
    </div>
  );
}

export default StudentProfile;
