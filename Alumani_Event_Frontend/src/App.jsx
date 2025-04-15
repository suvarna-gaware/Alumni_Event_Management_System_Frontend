import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import NavBar from './Component/NavBar';
import Home from './Component/Home';
import Events from './Component/Events';
import About from './Component/About';
import AdminDashboard from './Component/AdminDashboard';
import Gallery from './Component/Gallary';

import Footer from './Component/Footer';
import LoginForm from './Component/LoginForm';

function AppContent() {
  const location = useLocation();
  const currentPath = location.pathname;

  // Show NavBar only on public pages
  const publicPaths = ['/', '/adminlogin', '/about', '/gallery', '/event', '/account', '/login'];
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
              <section id="gallery"><Gallery /></section>
              <section id="event"><Events /></section>
              <section id='footer'><Footer /></section>
            </div>
          }
        />
        <Route path="/login" element={<LoginForm />} />

        {/* Dashboard routes */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        {/* Add routes for other dashboards */}
        {/* <Route path="/alumni-dashboard" element={<AlumniDashboard />} /> */}
        {/* <Route path="/organization-dashboard" element={<OrganizationDashboard />} /> */}
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
