import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';
import {
  FaUserGraduate,
  FaCalendarAlt,
  FaUsers,
  FaBuilding,
  FaCommentDots,
  FaClipboardCheck,
  FaSignOutAlt,
  FaChevronDown,
  FaChevronRight,
  FaUserShield
} from 'react-icons/fa';

import AlumniForm from './AdminPages/Alumniform';
import DepartmentForm from './AdminPages/Departmentfrom';
import Event from './AdminPages/Event';
import Organization from './AdminPages/Orgnization';
import Feedback from './AdminPages/Feedback';
import EventAttendance from './AdminPages/Eventnattendece';
import ViweDep from './AdminPages/ViweDep';
import ViewEvents from './AdminPages/ViewEvent';
import ViewAlumni from './ViweAlumni';

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
      return <p className="placeholder-text">Please select a section and action from the sidebar.</p>;
    }

    switch (section) {
      case 'alumni':
        return action === 'add' ? <AlumniForm /> :<ViewAlumni/>;
      case 'department':
        return action === 'add' ? <DepartmentForm /> : <ViweDep />;
      case 'organization':
        return action === 'add' ? <Organization /> : <p>Organization - View not implemented yet.</p>;
      case 'events':
        return action === 'add' ? <Event /> : <ViewEvents />;
      case 'attendance':
        return action === 'add' ? <EventAttendance /> : <p>Attendance - View not implemented yet.</p>;
      case 'feedback':
        return <Feedback />; // Only View for feedback
      default:
        return <p>Invalid selection.</p>;
    }
  };

  // Sidebar sections in new order
  const sections = [
    { key: 'alumni', label: 'Alumni', icon: <FaUserGraduate />, allowAdd: true },
    { key: 'department', label: 'Department', icon: <FaBuilding />, allowAdd: true },
    { key: 'organization', label: 'Organizer', icon: <FaUsers />, allowAdd: true },
    { key: 'events', label: 'Events', icon: <FaCalendarAlt />, allowAdd: true },
    { key: 'attendance', label: 'Event Attendance', icon: <FaClipboardCheck />, allowAdd: true },
    { key: 'feedback', label: 'Feedback', icon: <FaCommentDots />, allowAdd: false } // Feedback only view
  ];

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2 className="admin-panel-title">
          <FaUserShield style={{ marginRight: '8px' }} />
          Admin Panel
        </h2>
        <hr />

        {sections.map(({ key, label, icon, allowAdd }) => (
          <div key={key} className="menu-section">
            <div className="section-title" onClick={() => toggleSection(key)}>
              <span className="icon">{icon}</span>
              <span className="label">{label}</span>
              <span className="arrow">
                {openSection === key ? <FaChevronDown /> : <FaChevronRight />}
              </span>
            </div>
            {openSection === key && (
              <div className="dropdown">
                {allowAdd && <p onClick={() => handleSelect(key, 'add')}>➕ Add</p>}
                <p onClick={() => handleSelect(key, 'view')}>👁️ View</p>
              </div>
            )}
          </div>
        ))}

        <button className="logout-button" onClick={handleLogout}>
          <FaSignOutAlt /> Logout
        </button>
      </div>

      <div className="main-content">{renderContent()}</div>
    </div>
  );
}

export default AdminDashboard;
