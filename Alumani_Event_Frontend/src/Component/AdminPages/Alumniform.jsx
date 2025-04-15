import { useState } from "react";
import "./AlumniForm.css";

function AlumniForm({ onSubmit }) {
  const [form, setForm] = useState({
    Did: "",
    alumni_name: "",
    gender: "",
    passout_year: "",
    address: "",
    alumni_email: "",
    contact: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="alumni-form-container">
      <div className="alumni-form-box">
        <h1>Alumni Registration</h1>
        <form className="alumni-form" onSubmit={handleSubmit}>
          <input
            name="Did"
            placeholder="Department ID"
            onChange={handleChange}
          />
          <input
            name="alumni_name"
            placeholder="Alumni Name"
            onChange={handleChange}
            required
          />
          
          {/* Gender and Passout Year in one row */}
          <div className="form-row">
            <select
              name="gender"
              onChange={handleChange}
              value={form.gender}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <input
              name="passout_year"
              placeholder="Passout Year"
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <input
              name="alumni_email"
              placeholder="Email"
              onChange={handleChange}
            />
            <input
              name="contact"
              placeholder="Contact"
              onChange={handleChange}
              required
            />
          </div>
          {/* Address field on top, and below it Email and Contact in one row */}
          <input
            name="address"
            placeholder="Address"
            onChange={handleChange}
            required
          />
          
          

          <button type="submit">Add Alumni</button>
        </form>
      </div>
    </div>
  );
}

export default AlumniForm;
