import React from 'react';
import { useLocation } from 'react-router-dom';

function AlumniDashboard() {
  const location = useLocation();
  const alumni = location.state?.alumni;

  if (!alumni) {
    return <h2>No Alumni data found. Please log in again.</h2>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Welcome, {alumni.name}!</h2>
      <p><strong>Alumni ID:</strong> {alumni.alumni_id}</p>
      <p><strong>Email:</strong> {alumni.email}</p>
      <p><strong>Contact:</strong> {alumni.contact}</p>
    
    </div>
  );
}

export default AlumniDashboard;
