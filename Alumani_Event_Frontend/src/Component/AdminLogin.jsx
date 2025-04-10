import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './AdminLogin.css'; 

const AdminLogin = () => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (admin.username === 'admin' && admin.password === 'admin123') {
      localStorage.setItem("isAdmin", "true");
      alert("Login Successful!");
      navigate("/dashboard");  // ✅ Redirect to dashboard
    } else {
      alert("Invalid credentials. Try admin / admin123");
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-box">
        <h2 className="text-center mb-4">Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Username:</label>
            <input
              type="text"
              className="form-control"
              name="username"
              value={admin.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password:</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={admin.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
  Login
</button>

        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
