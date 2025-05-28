import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
// import './OrganizerProfile.css';

function OrganizerProfile({ organization }) {
  const [departments, setDepartments] = useState([]);
  const [orgData, setOrgData] = useState(organization || null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    fetchDepartments();
  }, []);

  useEffect(() => {
    setOrgData(organization || null);
  }, [organization]);

  const fetchDepartments = async () => {
    try {
      const res = await fetch('http://localhost:8766/getDepartments');
      const data = await res.json();
      setDepartments(data);
    } catch (err) {
      console.error('Error fetching departments:', err);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to load departments!',
      });
    }
  };

  const getDepartmentName = (deptid) => {
    const dept = departments.find((d) => d.deptid === deptid || d.did === deptid);
    return dept ? dept.deptname || dept.dname : 'N/A';
  };

  const handleChange = (e) => {
    setOrgData({ ...orgData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch('http://localhost:8766/updateOrg', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orgData),
      });

      if (res.ok) {
        await Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Profile updated successfully!',
          timer: 2000,
          showConfirmButton: false,
        });
        setEditMode(false);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Update Failed',
          text: 'Failed to update profile.',
        });
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Something went wrong while updating.',
      });
    }
  };

  if (!orgData) return <p>No organizer data available.</p>;

  return (
    <div
      className="organizer-profile-container mt-5"
      style={{
        maxWidth: 500,
        margin: '2rem auto',
        padding: '1.5rem',
        backgroundColor: '#fff',
        borderRadius: 8,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      }}
    >
      <h2>🏢 Organizer Profile</h2>
      {!editMode ? (
        <>
          <p>
            <strong>Organization ID:</strong> {orgData.orgid}
          </p>
          <p>
            <strong>Name:</strong> {orgData.orgname}
          </p>
          <p>
            <strong>Email:</strong> {orgData.orgemail}
          </p>
          <p>
            <strong>Contact:</strong> {orgData.orgcontact}
          </p>
          <p>
            <strong>Department:</strong> {getDepartmentName(orgData.deptid)}
          </p>

          <button onClick={() => setEditMode(true)}>✏️ Edit Profile</button>
        </>
      ) : (
        <div className="profile-form">
          <label>
            Name:
            <input name="orgname" value={orgData.orgname} onChange={handleChange} />
          </label>

          <label>
            Email:
            <input name="orgemail" value={orgData.orgemail} onChange={handleChange} />
          </label>

          <label>
            Contact:
            <input name="orgcontact" value={orgData.orgcontact} onChange={handleChange} />
          </label>

          <label>
            Department:
            <select name="deptid" value={orgData.deptid} onChange={handleChange}>
              <option value="">-- Select Department --</option>
              {departments.map((d) => (
                <option key={d.deptid || d.did} value={d.deptid || d.did}>
                  {d.deptname || d.dname}
                </option>
              ))}
            </select>
          </label>

          <button onClick={handleUpdate}>💾 Save</button>
          <button onClick={() => setEditMode(false)} style={{ marginLeft: 10 }}>
            ❌ Cancel
          </button>
        </div>
      )}
    </div>
  );
}

export default OrganizerProfile;
