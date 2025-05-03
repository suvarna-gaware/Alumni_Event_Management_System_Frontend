import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';

function LoginForm() {
  const [loginData, setLoginData] = useState({
    role: '',
    username: '',
    password: ''
  });

  const [response, setResponse] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { role, username, password } = loginData;

    if (role === 'admin') {
      if (username === 'admin' && password === 'admin123') {
        setResponse({ status: 'success', message: 'Admin login successful' });
        navigate('/admin-dashboard');
      } else {
        setResponse({ status: 'error', message: 'Invalid Admin credentials' });
      }
    } else if (role === 'alumni') {
      try {
        const res = await fetch('http://localhost:8766/viewAllAlumni');
        if (!res.ok) throw new Error('Failed to fetch alumni data');

        const alumniList = await res.json();
        console.log("Alumni List:", alumniList);

        const matchedAlumni = alumniList.find(
          (alumni) =>
            alumni.email.trim().toLowerCase() === username.trim().toLowerCase() &&
            alumni.contact.trim() === password.trim()
        );

        if (matchedAlumni) {
          console.log("Matched Alumni:", matchedAlumni);
          setResponse({ status: 'success', message: 'Alumni login successful' });
          navigate('/alumni-dashboard', { state: { alumni: matchedAlumni } });
        } else {
          setResponse({ status: 'error', message: 'Invalid Alumni credentials' });
        }
      } catch (error) {
        console.error("Error fetching alumni data:", error);
        setResponse({ status: 'error', message: 'Server error. Please try again.' });
      }
    } else if (role === 'organization') {
      if (username === 'org@example.com' && password === 'org123') {
        setResponse({ status: 'success', message: 'Organization login successful' });
        navigate('/organization-dashboard');
      } else {
        setResponse({ status: 'error', message: 'Invalid Organization credentials' });
      }
    } else {
      setResponse({ status: 'error', message: 'Please select a valid role' });
    }
  };

  const renderLabel = (field) => {
    const { role } = loginData;
    if (field === 'username') {
      if (role === 'admin') return 'Username:';
      if (role === 'alumni') return 'Alumni Email:';
      if (role === 'organization') return 'Organization Email:';
    } else if (field === 'password') {
      if (role === 'admin') return 'Password:';
      return 'Contact Number:';
    }
    return '';
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="input-group">
          <label>Role:</label>
          <select
            name="role"
            value={loginData.role}
            onChange={handleChange}
            required
            className="login-input"
          >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="alumni">Alumni</option>
            <option value="organization">Organization</option>
          </select>
        </div>

        <div className="input-group">
          <label>{renderLabel('username')}</label>
          <input
            type="text"
            name="username"
            value={loginData.username}
            onChange={handleChange}
            required
            className="login-input"
          />
        </div>

        <div className="input-group">
          <label>{renderLabel('password')}</label>
          <input
            type={loginData.role === 'admin' ? 'password' : 'text'}
            name="password"
            value={loginData.password}
            onChange={handleChange}
            required
            className="login-input"
          />
        </div>

        <button type="submit" className="login-button">Login</button>
      </form>

      {response && (
        <div
          style={{
            marginTop: '10px',
            color: response.status === 'success' ? 'green' : 'red'
          }}
        >
          <p>{response.message}</p>
        </div>
      )}
    </div>
  );
}

export default LoginForm;
