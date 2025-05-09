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



import StudentDashbord from './Component/StudentDashBord';

function AppContent() {
  const location = useLocation();
  const currentPath = location.pathname;

  
  const publicPaths = ['/','/studentlogin', '/adminlogin', '/about', '/gallery', '/event', '/account', '/login'];
  const showNavBar = publicPaths.includes(currentPath);

  return (
    <>
      {showNavBar && <NavBar />}
      <Routes>
        
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

        
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/alumni-dashboard" element={<StudentDashbord/>} /> 
        
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
