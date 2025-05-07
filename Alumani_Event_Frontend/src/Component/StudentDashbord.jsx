import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './StudentDashboard.css';
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
import StudentProfile from './StudentProfile';
import Logout from './AdminPages/Logout';
import UpcomingEvent from './AdminPages/UpcomingEvent';

// // Import the components for View and Add Feedback
// import ViewFeedback from './StudentPages/ViewFeedback';
// import AddFeedback from './StudentPages/AddFeedback';  // This is the new component you'll need to create

function StudentDashboard() {
  const navigate = useNavigate();
  const [openSection, setOpenSection] = useState(null);
  const [selected, setSelected] = useState({ section: null, action: null });

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const handleSelect = (section, action) => {
    setSelected({ section, action });
  };


  const renderContent = () => {
    const { section, action } = selected;

    if (!section || !action) {
      return <p className="placeholder-text">Please select a section and action from the sidebar.</p>;
    }

    switch (section) {
      case 'profile':
        return <StudentProfile />;
      case 'events':
        return <UpcomingEvent />;
      case 'feedback':
        return action === 'add' ? <AddFeedback /> : <ViewFeedback />;
      default:
        return <p>Invalid selection.</p>;
    }
  };

  // Sidebar sections for the Student Dashboard
  const sections = [
    { key: 'profile', label: 'Profile', icon: <FaUserGraduate /> },
    { key: 'events', label: 'Events', icon: <FaCalendarAlt /> },
    { key: 'feedback', label: 'Feedback', icon: <FaCommentDots />, allowAdd: true }, // Allow "Add Feedback"
  ];

  return (
    <>
    <Logout/>
    <div className="dashboard-container">
      <div className="sidebar">
        <h2 className="student-panel-title">
          <FaUserShield style={{ marginRight: '8px' }} />
          Student Panel
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
                <p onClick={() => handleSelect(key, 'view')}>👁️ View </p>
                {allowAdd && <p onClick={() => handleSelect(key, 'add')}>➕ Add Feedback</p>} {/* Show Add Feedback option */}
              </div>
            )}
          </div>
        ))}

       
      </div>

      <div className="main-content">{renderContent()}</div>
    </div>
    </>
  );
}

export default StudentDashboard;
