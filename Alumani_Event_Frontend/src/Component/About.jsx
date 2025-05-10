import React from 'react';
import "./About.css"; 
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="container my-5">
      <div className="text-center ">
        <h1 className="display fw-bold text-primary">About Us</h1>
        <p className="lead text-secondary">Learn more about our institution and our mission to connect alumni.</p>
      </div>

      <div className="row g-4"> 
        <div className="col-md-6">
          <div className="p-3 border rounded shadow-sm bg-light h-100"> 
            <h5 className="text-success"> Why Alumni Events Matter</h5> 
            <p className="small"><li>Reconnect alumni with their peers and institution</li>
          <li>Foster mentorship and guidance for current students</li>
          <li>Celebrate milestones and share inspirational stories</li>
          <li>Encourage donations, support, and institutional growth</li></p> 
          </div>
        </div>

        <div className="col-md-6">
          <div className="p-3 border rounded shadow-sm bg-light h-100"> 
            <h5 className="text-success"> Key Features</h5> 
            <p className="small"><li>Easy creation and management of alumni events</li>
          <li>Profile access and updates for alumni and organizers</li>
          <li>Monitor event attendance and collect feedback</li>
          <li>Secure login for admins, alumni, and organizations</li></p> 
          </div>
        </div>

        <div className="col-12">
          <div className="p-3 border rounded shadow-sm bg-light"> 
            <h5 className="text-success">Features</h5> 
            <ul className="list-group list-group-flush">
              <li className="list-group-item small">✅ Alumni Management</li> 
              <li className="list-group-item small">✅ Event Registration</li>
              <li className="list-group-item small">✅ Feedback System</li> 
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;