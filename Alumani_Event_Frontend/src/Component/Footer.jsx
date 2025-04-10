import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer bg-dark text-light pt-5 pb-3">
      <div className="container">
        <div className="row">

          {/* About Section */}
          <div className="col-md-4 mb-4">
            <h5 className="text-uppercase mb-3">Alumni EMS</h5>
            <p>
              Bridging alumni and alma mater through seamless event management and active engagement.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-4">
            <h5 className="text-uppercase mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/" className="footer-link">Home</Link></li>
              <li><Link to="/events" className="footer-link">Events</Link></li>
              <li><Link to="/about" className="footer-link">About</Link></li>
              <li><Link to="/contact" className="footer-link">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-md-4 mb-4">
            <h5 className="text-uppercase mb-3">Contact</h5>
            <p>Email: support@alumniems.com</p>
            <p>Phone: +91 98765 43210</p>
            <p>XYZ Institute, City, Country</p>
          </div>
        </div>

        <hr className="border-secondary" />

        <div className="text-center">
          <small>&copy; {new Date().getFullYear()} Alumni EMS. All rights reserved.</small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
