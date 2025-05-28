import React from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './NavBar.css';


const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-lg px-4 fixed-top">
      <div className="container-fluid">
        {/* Logo with smoother appearance */}
        <HashLink className="navbar-brand d-flex align-items-center" smooth to="#home">
          <img 
            src="src/assets/logo-removebg-preview.png" 
            alt="Alumni Logo" 
            style={{ height: '45px', width: 'auto', marginRight: '10px' }} 
          />
          <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#f8f9fa' }}>Alumni EMS</span>
        </HashLink>

        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav ms-auto text-center">
            <li className="nav-item">
              <HashLink className="nav-link nav-item-custom" smooth to="#home">Home</HashLink>
            </li>
            <li className="nav-item">
              <HashLink className="nav-link nav-item-custom" smooth to="#about">About</HashLink>
            </li>
            <li className="nav-item">
              <HashLink className="nav-link nav-item-custom" smooth to="#gallery">Gallery</HashLink>
            </li>
            <li className="nav-item">
              <HashLink className="nav-link nav-item-custom" smooth to="#event">Events</HashLink>
            </li>
            <li className="nav-item">
              <Link className="nav-link nav-item-custom" to="/login">Login</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
