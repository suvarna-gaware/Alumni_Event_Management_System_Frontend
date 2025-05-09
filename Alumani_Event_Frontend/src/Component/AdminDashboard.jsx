import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
 import "./AdminDashboard.css";

import {
  FaUserGraduate,
  FaCalendarAlt,
  FaUsers,
  FaBuilding,
  FaCommentDots,
  FaClipboardCheck,
  FaChevronDown,
  FaChevronRight,
  FaUserShield
} from 'react-icons/fa';

import AlumniForm from './AdminPages/Alumniform';
import DepartmentForm from './AdminPages/Departmentfrom';
import Event from './AdminPages/Event';
import Organization from './AdminPages/Orgnization';
import Feedback from './AdminPages/AddFeedbackForm';
import EventAttendance from './AdminPages/Eventnattendece';
import ViweDep from './AdminPages/ViweDep';
import ViewEvents from './AdminPages/ViewEvent';
import ViewAlumni from './ViweAlumni';
import ViewAttendance from './AdminPages/ViweAttendance';
import ViewOrganization from './AdminPages/ViweOrgnizer';
import Logout from './AdminPages/Logout';
import ViewFeedback from './AdminPages/ViewFeedback';

function AdminDashboard() {
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
      case 'alumni':
        return action === 'add' ? <AlumniForm/> : <ViewAlumni/>;
      case 'department':
        return action === 'add' ? <DepartmentForm /> : <ViweDep/>;
      case 'organization':
        return action === 'add' ? <Organization /> : <ViewOrganization />;
      case 'events':
        return action === 'add' ? <Event /> : <ViewEvents />;
      case 'attendance':
        return action === 'add' ? <EventAttendance/> : <ViewAttendance/>;
      case 'feedback':
        return <ViewFeedback/>;
      default:
        return <p>Invalid selection.</p>;
    }
  };

  const sections = [
    { key: 'alumni', label: 'Alumni', icon: <FaUserGraduate />, allowAdd: true },
    { key: 'department', label: 'Department', icon: <FaBuilding />, allowAdd: true },
    { key: 'organization', label: 'Organizer', icon: <FaUsers />, allowAdd: true },
    { key: 'events', label: 'Events', icon: <FaCalendarAlt />, allowAdd: true },
    { key: 'attendance', label: 'Event Attendance', icon: <FaClipboardCheck />, allowAdd: true },
    { key: 'feedback', label: 'Feedback', icon: <FaCommentDots />, allowAdd: false }
  ];

  return (
    <>
      <Logout />
      <div className="dashboard-container">
        <div className="sidebar mt-">
          <h2 className="admin-panel-title">
            <FaUserShield className="me-2" />
            Admin Panel
          </h2>
          <hr />
          {sections.map(({ key, label, icon, allowAdd }) => (
            <div key={key} className="menu-section">
              <div className="section-title" onClick={() => toggleSection(key)}>
                <span className="icon">{icon}</span>
                <span className="label">{label}</span>
                <span className="arrow">{openSection === key ? <FaChevronDown /> : <FaChevronRight />}</span>
              </div>
              {openSection === key && (
                <div className="dropdown">
                  {allowAdd && <p onClick={() => handleSelect(key, 'add')}>➕ Add</p>}
                  <p onClick={() => handleSelect(key, 'view')}>👁️ View</p>
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

export default AdminDashboard;
