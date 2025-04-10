import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from 'react-router-dom';

import NavBar from './Component/NavBar';
import Home from './Component/Home';
import Events from './Component/Events';
import About from './Component/About';
import AdminLogin from './Component/AdminLogin';
import AdminDashboard from './Component/AdminDashboard';
import Gallery from './Component/Gallary';
import Footer from './Component/Footer';

// Dashboard Wrapper to extract content based on path
function DashboardWrapper() {
  const location = useLocation();
  const path = location.pathname;
  const content = path.replace('/dashboard-', '');

  return <AdminDashboard content={content} />;
}

function AppContent() {
  const location = useLocation();
  const currentPath = location.pathname;

  // Show NavBar only on public pages
  const publicPaths = ['/', '/adminlogin', '/about', '/gallery', '/event', '/account'];
  const showNavBar = publicPaths.includes(currentPath);

  return (
    <>
      {showNavBar && <NavBar />}
      <Routes>
        {/* Public pages */}
        <Route
          path="/"
          element={
            <div>
              <section id="home"><Home /></section>
              <section id="about"><About /></section>
              <section id="gallery"><Gallery/></section>
              <section id="event"><Events /></section>
              <section id='footrer'><Footer/></section>
            </div>
          }
        />
        <Route path="/adminlogin" element={<AdminLogin />} />

        {/* Admin dashboard routes */}
        <Route path="/dashboard-department" element={<DashboardWrapper />} />
        <Route path="/dashboard-events" element={<DashboardWrapper />} />
        <Route path="/dashboard-alumni" element={<DashboardWrapper />} />
        <Route path="/dashboard-organization" element={<DashboardWrapper />} />
        <Route path="/dashboard-feedback" element={<DashboardWrapper />} />
        <Route path="/dashboard-attendance" element={<DashboardWrapper />} />

        {/* Optional: Redirect base dashboard route to a default view */}
        <Route path="/dashboard" element={<Navigate to="/dashboard-department" replace />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
