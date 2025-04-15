import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './AdminLogin.css';

// ✅ Define constants for hardcoded credentials
const VALID_USERNAME = "admin";
const VALID_PASSWORD = "admin123";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (admin.username === VALID_USERNAME && admin.password === VALID_PASSWORD) {
      localStorage.setItem("isAdmin", "true");
      alert("Login Successful!");
      navigate("/dashboard");
    } else {
      setError("Incorrect username or password.");
    }
  };

  return (
    <div className="admin-login-wrapper d-flex align-items-center justify-content-center vh-100">
      <div className="admin-login-card p-4 shadow rounded bg-white" style={{ width: '400px' }}>
        <h3 className="text-center mb-4">🔐 Admin Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input
              type="text"
              name="username"
              className="form-control"
              placeholder="example@email.com"
              value={admin.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="********"
              value={admin.password}
              onChange={handleChange}
              required
            />
          </div>

          {error && <div className="alert alert-danger">{error}</div>}

          <a href="/forgot-password" className="d-block mb-3 text-decoration-none text-primary">Forgot password?</a>

          <button type="submit" className="btn btn-primary w-100">LOGIN</button>

          <div className="text-center mt-3">
            Don’t have an account? <a href="/signup" className="text-primary">Sign up.</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
