import { useState, useEffect } from "react";
import "./AlumniForm.css";

function AlumniForm() {
  const [departments, setDepartments] = useState([]);
  const [form, setForm] = useState({
    deptid: "",
    name: "",
    email: "",
    contact: "",
    address: "",
    gender: "",
    year: "",
    status: "",
  });

  useEffect(() => {
    fetch("http://localhost:8766/getDepartments")
      .then((res) => res.json())
      .then((data) => setDepartments(data))
      .catch((err) => console.error("Error fetching departments:", err));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8766/createAlumni", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        alert("Alumni Created Successfully!");
        setForm({
          deptid: "",
          name: "",
          email: "",
          contact: "",
          address: "",
          gender: "",
          year: "",
          status: "",
        });
      } else {
        alert("Failed to create alumni!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error creating alumni!");
    }
  };

  return (
    <div className="alumni-form-container">
      <div className="alumni-form-box">
        <h1>Alumni Registration</h1>
        <form className="alumni-form" onSubmit={handleSubmit}>
          {/* Alumni Name */}
          <input
            type="text"
            name="name"
            placeholder="Alumni Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          {/* Department dropdown and Passout Year in the same row */}
          <div className="form-row">
            <select
              name="deptid"
              value={form.deptid}
              onChange={handleChange}
              required
            >
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept.deptid} value={dept.deptid}>
                  {dept.deptname}
                </option>
              ))}
            </select>

            <select
              name="year"
              value={form.year}
              onChange={handleChange}
              required
            >
              <option value="">Select Passout Year</option>
              {Array.from({ length: 50 }, (_, i) => 1980 + i).map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          {/* Gender and Contact in the same row */}
          <div className="form-row">
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>

            <input
              type="text"
              name="contact"
              placeholder="Contact"
              value={form.contact}
              onChange={handleChange}
              required
            />
          </div>

          {/* Status and Address in the same row */}
          <div className="form-row">
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              required
            >
              <option value="">Select Status</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>

            <input
              type="text"
              name="address"
              placeholder="Address"
              value={form.address}
              onChange={handleChange}
              required
            />
          </div>

          {/* Submit Button */}
          <button type="submit">Add Alumni</button>
        </form>
      </div>
    </div>
  );
}

export default AlumniForm;
