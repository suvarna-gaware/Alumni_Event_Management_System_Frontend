import React from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow px-4 fixed-top">
      <div className="container-fluid">
        <HashLink className="navbar-brand" smooth to="#home">Alumni EMS</HashLink>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <HashLink className="nav-link" smooth to="#home">Home</HashLink>
            </li>
            <li className="nav-item">
              <HashLink className="nav-link" smooth to="#about">About</HashLink>
            </li>
            <li className="nav-item">
              <HashLink className="nav-link" smooth to="#gallery">Gallery</HashLink>
            </li>
            <li className="nav-item">
              <HashLink className="nav-link" smooth to="#event">Events</HashLink>
            </li>

            {/* ✅ Fix this line */}
            <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
