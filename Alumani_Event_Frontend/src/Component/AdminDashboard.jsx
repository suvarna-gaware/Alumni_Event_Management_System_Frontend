import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

// Import your components
import DepartmentForm from './AdminPages/Departmentfrom';
import Event from './AdminPages/Event';
import AlumniForm from './AdminPages/Alumniform';
import Organization from './AdminPages/Orgnization';
import Feedback from './AdminPages/Feedback';
import EventAttendance from './AdminPages/Eventnattendece';

function AdminDashboard() {
  const navigate = useNavigate();
  const [openSection, setOpenSection] = useState(null);
  const [selected, setSelected] = useState({ section: null, action: null });

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const handleSelect = (section, action) => {
    setSelected({ section, action });
  };

  const handleLogout = () => {
    navigate('/adminlogin');
  };

  const renderContent = () => {
    const { section, action } = selected;

    if (!section || !action) {
      return <p>Please select a section and action from the sidebar.</p>;
    }

    if (section === 'department' && action === 'add') return <DepartmentForm />;
    if (section === 'events' && action === 'add') return <Event />;
    if (section === 'alumni' && action === 'add') return <AlumniForm />;
    if (section === 'organization' && action === 'add') return <Organization />;
    if (section === 'feedback' && action === 'add') return <Feedback />;
    if (section === 'attendance' && action === 'add') return <EventAttendance />;

    // Add view component logic if needed
    return <p>{`You selected ${section.toUpperCase()} - ${action.toUpperCase()}`}</p>;
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2>Alumni EMS</h2>
        <hr />

        {['department', 'events', 'alumni', 'organization', 'feedback', 'attendance'].map((section) => (
          <div key={section} className="menu-section">
            <p onClick={() => toggleSection(section)}>
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </p>
            {openSection === section && (
              <div className="dropdown">
                <p onClick={() => handleSelect(section, 'add')}>Add</p>
                <p onClick={() => handleSelect(section, 'view')}>View</p>
              </div>
            )}
          </div>
        ))}

        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="main-content">{renderContent()}</div>
    </div>
  );
}

export default AdminDashboard;
