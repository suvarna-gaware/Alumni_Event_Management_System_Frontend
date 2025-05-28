import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import OrganizerProfile from './OrgnizerProfile';
import Logout from './Logout';
import OrgDashboardCount from './OrgDashboardCount';
import 'bootstrap/dist/css/bootstrap.min.css';
import CreateEvent from './AddEvent';
import ViewEventsByDept from '../AdminPages/ViewEventsByDept'

const OrganizationDashboard = () => {
  const { organization } = useLocation().state || {};
  const [activeSection, setActiveSection] = useState('Dashboard');
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (key) => {
    setOpenDropdown((prev) => (prev === key ? null : key));
  };

  const handleKeyPress = (e, key) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleDropdown(key);
    }
  };

  const renderSection = () => {
    console.log('Rendering section:', activeSection);
    switch (activeSection) {
      case 'Dashboard':
        return (
          <>
            <h2 className="mb-4">Welcome to the Organization Dashboard</h2>
            {organization ? (
              <OrgDashboardCount orgId={organization.orgid} />
            ) : (
              <p>Loading organization data...</p>
            )}
          </>
        );
      case 'Profile':
        return <OrganizerProfile organization={organization} />;
      case 'AddEvent':
        return <CreateEvent organization={organization} />;
      case 'ViewEvents':
         console.log('Rendering ViewEventsByDept with organization:', organization);
        return <ViewEventsByDept organization={organization} />;
      case 'MarkAttendance':
        return <p>[Mark Attendance Component Placeholder]</p>;
      case 'ViewAttendance':
        return <p>[View Attendance Component Placeholder]</p>;
      case 'ViewFeedback':
        return <p>[Feedback View Component Placeholder]</p>;
      default:
        return <h2>Welcome to the Organization Dashboard</h2>;
    }
  };

  return (
    <>
      <div className="fixed-top bg-white shadow-sm">
        <Logout />
      </div>

      <div className="container-fluid" style={{ paddingTop: '70px' }}>
        <div className="row" style={{ height: 'calc(100vh - 70px)' }}>
          <nav
            className="col-md-3 bg-dark text-white p-3"
            style={{ height: '100%', position: 'fixed', top: '70px', left: 0 }}
            aria-label="Organization Dashboard Sidebar"
          >
            <h4 className="text-center mb-4">Organizer Panel</h4>
            <ul className="nav flex-column" role="menu">
              <li
                className={`nav-item mb-2 px-2 py-2 rounded ${
                  activeSection === 'Profile' ? 'bg-secondary' : 'bg-dark'
                }`}
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  setActiveSection('Profile');
                  setOpenDropdown(null);
                }}
                role="menuitem"
                tabIndex={0}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    setActiveSection('Profile');
                    setOpenDropdown(null);
                  }
                }}
              >
                👤 Profile
              </li>

              <li className="nav-item">
                <div
                  role="button"
                  aria-expanded={openDropdown === 'Events'}
                  aria-controls="events-dropdown"
                  tabIndex={0}
                  onClick={() => toggleDropdown('Events')}
                  onKeyPress={(e) => handleKeyPress(e, 'Events')}
                  className={`px-2 py-2 rounded ${
                    openDropdown === 'Events' ? 'bg-secondary' : 'bg-dark'
                  }`}
                  style={{ cursor: 'pointer' }}
                >
                  🗕️ Events ▾
                </div>
                {openDropdown === 'Events' && (
                  <ul
                    id="events-dropdown"
                    className="nav flex-column ms-3"
                    role="menu"
                  >
                    <li
                      className={`nav-item py-1 ${
                        activeSection === 'AddEvent' ? 'text-warning' : ''
                      }`}
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        setActiveSection('AddEvent');
                        setOpenDropdown(null);
                      }}
                      role="menuitem"
                      tabIndex={-1}
                    >
                      ➕ Add Event
                    </li>
                    <li
                      className={`nav-item py-1 ${
                        activeSection === 'ViewEvents' ? 'text-warning' : ''
                      }`}
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        setActiveSection('ViewEvents');
                        setOpenDropdown(null);
                      }}
                      role="menuitem"
                      tabIndex={-1}
                    >
                      📂 View Events
                    </li>
                  </ul>
                )}
              </li>

              <li className="nav-item">
                <div
                  role="button"
                  aria-expanded={openDropdown === 'Attendance'}
                  aria-controls="attendance-dropdown"
                  tabIndex={0}
                  onClick={() => toggleDropdown('Attendance')}
                  onKeyPress={(e) => handleKeyPress(e, 'Attendance')}
                  className={`px-2 py-2 rounded ${
                    openDropdown === 'Attendance' ? 'bg-secondary' : 'bg-dark'
                  }`}
                  style={{ cursor: 'pointer' }}
                >
                  👥 Event Attendance ▾
                </div>
                {openDropdown === 'Attendance' && (
                  <ul
                    id="attendance-dropdown"
                    className="nav flex-column ms-3"
                    role="menu"
                  >
                    <li
                      className={`nav-item py-1 ${
                        activeSection === 'MarkAttendance' ? 'text-warning' : ''
                      }`}
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        setActiveSection('MarkAttendance');
                        setOpenDropdown(null);
                      }}
                      role="menuitem"
                      tabIndex={-1}
                    >
                      🗘️ Mark Attendance
                    </li>
                    <li
                      className={`nav-item py-1 ${
                        activeSection === 'ViewAttendance' ? 'text-warning' : ''
                      }`}
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        setActiveSection('ViewAttendance');
                        setOpenDropdown(null);
                      }}
                      role="menuitem"
                      tabIndex={-1}
                    >
                      📊 View Attendance
                    </li>
                  </ul>
                )}
              </li>

              <li className="nav-item">
                <div
                  role="button"
                  aria-expanded={openDropdown === 'Feedback'}
                  aria-controls="feedback-dropdown"
                  tabIndex={0}
                  onClick={() => toggleDropdown('Feedback')}
                  onKeyPress={(e) => handleKeyPress(e, 'Feedback')}
                  className={`px-2 py-2 rounded ${
                    openDropdown === 'Feedback' ? 'bg-secondary' : 'bg-dark'
                  }`}
                  style={{ cursor: 'pointer' }}
                >
                  💬 Feedback ▾
                </div>
                {openDropdown === 'Feedback' && (
                  <ul
                    id="feedback-dropdown"
                    className="nav flex-column ms-3"
                    role="menu"
                  >
                    <li
                      className={`nav-item py-1 ${
                        activeSection === 'ViewFeedback' ? 'text-warning' : ''
                      }`}
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        setActiveSection('ViewFeedback');
                        setOpenDropdown(null);
                      }}
                      role="menuitem"
                      tabIndex={-1}
                    >
                      📥 View Feedback
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          </nav>

          <main
            className="offset-md-3 col-md-9 p-4 bg-light"
            style={{ height: '100%', overflowY: 'auto' }}
            tabIndex={0}
          >
            {renderSection()}
          </main>
        </div>
      </div>
    </>
  );
};

export default OrganizationDashboard;
