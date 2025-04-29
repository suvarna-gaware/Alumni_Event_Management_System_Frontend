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
  FaUserShield // <-- Added this for Admin Panel icon
} from 'react-icons/fa';

// Components
import DepartmentForm from './AdminPages/Departmentfrom';
import Event from './AdminPages/Event';
import AlumniForm from './AdminPages/Alumniform';
import Organization from './AdminPages/Orgnization';
import Feedback from './AdminPages/Feedback';
import EventAttendance from './AdminPages/Eventnattendece';
import ViweDep from './AdminPages/ViweDep';
import ViewEvents from './AdminPages/ViewEvent';

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
      case 'department':
        return action === 'add' ? <DepartmentForm /> : <ViweDep />;
      case 'events':
        return action === 'add' ? <Event /> : <ViewEvents/>;
      case 'alumni':
        return action === 'add' ? <AlumniForm /> : <p>Alumni - View not implemented yet.</p>;
      case 'organization':
        return action === 'add' ? <Organization /> : <p>Organization - View not implemented yet.</p>;
      case 'feedback':
        return action === 'add' ? <Feedback /> : <p>Feedback - View not implemented yet.</p>;
      case 'attendance':
        return action === 'add' ? <EventAttendance /> : <p>Attendance - View not implemented yet.</p>;
      default:
        return <p>Invalid selection.</p>;
    }
  };

  const sections = [
    { key: 'department', label: 'Department', icon: <FaBuilding /> },
    { key: 'events', label: 'Events', icon: <FaCalendarAlt /> },
    { key: 'alumni', label: 'Alumni', icon: <FaUserGraduate /> },
    { key: 'organization', label: 'Organization', icon: <FaUsers /> },
    { key: 'feedback', label: 'Feedback', icon: <FaCommentDots /> },
    { key: 'attendance', label: 'Attendance', icon: <FaClipboardCheck /> }
  ];

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2 className="admin-panel-title">
          <FaUserShield style={{ marginRight: '8px' }} />
          Admin Panel
        </h2>
        <hr />

        {sections.map(({ key, label, icon }) => (
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
                <p onClick={() => handleSelect(key, 'add')}>➕ Add</p>
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
