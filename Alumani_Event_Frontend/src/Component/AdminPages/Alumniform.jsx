import { useState, useEffect } from "react";
import Swal from "sweetalert2";
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

    // Basic frontend validation
    const { name, email, deptid, year, gender, contact, status, address } = form;
    if (!name || !email || !deptid || !year || !gender || !contact || !status || !address) {
      Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "Please fill out all fields before submitting.",
      });
      return;
    }

    // Contact validation (must be 10 digits)
    if (!/^[0-9]{10}$/.test(contact)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Contact",
        text: "Contact number must be 10 digits.",
      });
      return;
    }

    // Email validation (basic format)
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Email",
        text: "Please enter a valid email address.",
      });
      return;
    }

    // Confirmation popup before submitting the form
    const confirmResult = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to create this alumni record?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, create it!",
      cancelButtonText: "Cancel",
    });

    if (!confirmResult.isConfirmed) {
      return; // Exit if the user cancels
    }

    try {
      const response = await fetch("http://localhost:8766/createAlumni", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Alumni Created Successfully!",
        });
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
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: "Failed to create alumni!",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "An error occurred while creating alumni.",
      });
    }
  };

  // Generate years from current year down to 1980
  const passoutYears = Array.from(
    { length: new Date().getFullYear() - 1980 + 1 },
    (_, i) => new Date().getFullYear() - i
  );

  return (
    <div className="alumni-form-container">
      <div className="alumni-form-box">
        <h1>Alumni Registration</h1>
        <form className="alumni-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Alumni Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />

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
              {passoutYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

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
              inputMode="numeric"
              pattern="[0-9]*"
            />
          </div>

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

          <button type="submit">Add Alumni</button>
        </form>
      </div>
    </div>
  );
}

export default AlumniForm;
