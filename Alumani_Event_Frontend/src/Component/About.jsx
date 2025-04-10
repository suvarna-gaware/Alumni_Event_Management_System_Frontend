import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="container my-5">
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold text-primary">About Us</h1>
        <p className="lead text-secondary">Learn more about our institution and our mission to connect alumni.</p>
      </div>

      <div className="row g-5">
        <div className="col-md-6">
          <div className="p-4 border rounded shadow-sm bg-light h-100">
            <h4 className="text-success">About the Institution</h4>
            <p>XYZ Institute has been building leaders since 1985. With a strong legacy of innovation and education, we’re proud to see our alumni thrive across industries worldwide.</p>
          </div>
        </div>

        <div className="col-md-6">
          <div className="p-4 border rounded shadow-sm bg-light h-100">
            <h4 className="text-success">Why This System?</h4>
            <p>This system was created to foster better communication and collaboration between the alumni and the institution. Stay updated, join events, and reconnect with old friends easily.</p>
          </div>
        </div>

        <div className="col-12">
          <div className="p-4 border rounded shadow-sm bg-light">
            <h4 className="text-success">Features</h4>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">✅ Alumni Management</li>
              <li className="list-group-item">✅ Event Registration</li>
              <li className="list-group-item">✅ Feedback System</li>
            </ul>
          </div>
        </div>

        {/* <div className="col-12">
          <div className="p-4 border rounded shadow-sm bg-light text-center">
            <h4 className="text-success">Want to get in touch?</h4>
            <p className="mb-0">
              Visit our <Link to="/contact" className="btn btn-outline-primary btn-sm ms-1">Contact Page</Link> to reach out.
            </p>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default About;
