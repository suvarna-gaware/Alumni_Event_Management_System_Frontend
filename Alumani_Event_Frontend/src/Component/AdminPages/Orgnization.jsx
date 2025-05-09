import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "./OrganizationForm.css";

function OrganizationForm() {
  const [form, setForm] = useState({
    deptid: "",
    orgname: "",
    orgemail: "",
    orgcontact: ""
  });

  const [departments, setDepartments] = useState([]);

  
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get("http://localhost:8766/getDepartments");
        setDepartments(response.data);
      } catch (error) {
        console.error("Error fetching departments:", error);
        Swal.fire("Error", "Failed to fetch departments.", "error");
      }
    };
    fetchDepartments();
  }, []);

  
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  
  const validateForm = () => {
    if (!form.deptid) {
      Swal.fire("Validation Error", "Please select a department.", "warning");
      return false;
    }
    if (!form.orgname.trim()) {
      Swal.fire("Validation Error", "Organization name is required.", "warning");
      return false;
    }
    if (!form.orgemail.trim()) {
      Swal.fire("Validation Error", "Email is required.", "warning");
      return false;
    }
    if (!form.orgcontact.trim()) {
      Swal.fire("Validation Error", "Contact is required.", "warning");
      return false;
    }
    return true;
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const res = await axios.post("http://localhost:8766/createOrg", form);

      if (res.data.includes("Added")) {
        Swal.fire("Success", "Organization added successfully!", "success");
        setForm({
          deptid: "",
          orgname: "",
          orgemail: "",
          orgcontact: ""
        });
      } else {
        Swal.fire("Failed", "Could not add organization: " + res.data, "error");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      Swal.fire("Server Error", "Something went wrong on the server.", "error");
    }
  };

  return (
    <form className="organization-form" onSubmit={handleSubmit}>
      <h2>Add Organizer</h2>

      <div className="form-group">
        <label htmlFor="deptid">Department</label>
        <select
          id="deptid"
          name="deptid"
          className="form-select"
          value={form.deptid}
          onChange={handleChange}
        >
          <option value="">-- Select Department --</option>
          {departments.map((dept) => (
            <option key={dept.deptid} value={dept.deptid}>
              {dept.deptname}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Orgnizer Name</label>
        <input
          name="orgname"
          className="form-control"
          placeholder="Organization Name"
          value={form.orgname}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Email</label>
        <input
          name="orgemail"
          type="email"
          className="form-control"
          placeholder="Email"
          value={form.orgemail}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Contact</label>
        <input
          name="orgcontact"
          className="form-control"
          placeholder="Contact Number"
          value={form.orgcontact}
          onChange={handleChange}
        />
      </div>

      <button type="submit" className="btn-submit">
        Add Orgnizer
      </button>
    </form>
  );
}

export default OrganizationForm;
