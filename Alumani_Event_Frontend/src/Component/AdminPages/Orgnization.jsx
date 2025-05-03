import { useState, useEffect } from "react";
import './OrganizationForm.css';
import axios from "axios";

function OrganizationForm() {
  const [form, setForm] = useState({
    deptid: "",
    orgname: "",
    orgemail: "",
    orgcontact: ""
  });

  const [departments, setDepartments] = useState([]);
  const [errors, setErrors] = useState({
    deptid: "",
    orgname: "",
    orgemail: "",
    orgcontact: ""
  });
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch departments on component mount
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get("http://localhost:8766/getDepartments");
        setDepartments(response.data);
      } catch (error) {
        console.error("Error fetching departments:", error);
        alert("Failed to fetch departments.");
      }
    };

    fetchDepartments();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Reset error message for the specific field
    setErrors({ ...errors, [e.target.name]: "" });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear any previous success message
    setSuccessMessage("");

    // Validate form fields
    let fieldErrors = {};
    if (!form.deptid) fieldErrors.deptid = "Department is required.";
    if (!form.orgname) fieldErrors.orgname = "Organization name is required.";
    if (!form.orgemail) fieldErrors.orgemail = "Email is required.";
    if (!form.orgcontact) fieldErrors.orgcontact = "Contact is required.";

    // If there are validation errors, set errors and don't submit
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    try {
      const res = await axios.post("http://localhost:8766/createOrg", form);
      console.log("Response:", res.data);

      if (res.data.status === "success") {
        setSuccessMessage("Organization added successfully!");
        setForm({
          deptid: "",
          orgname: "",
          orgemail: "",
          orgcontact: ""
        });
      } else {
        alert(`Failed to add orgaanization: ${res.data.message || "Unknown error"}`);
      }
    } 
    catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to add organization due to an error.");
    }
  };

  return (
    <form className="organization-form" onSubmit={handleSubmit}>
      <h2>Add Organization</h2>

      {/* Success Message */}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}

      {/* Department Dropdown */}
      <div className="mb-3">
        <label htmlFor="deptid" className="form-label">Department</label>
        <select
          id="deptid"
          name="deptid"
          className="form-select"
          value={form.deptid}
          onChange={handleChange}
          required
        >
          <option value="">-- Select Department --</option>
          {departments.map((dept) => (
            <option key={dept.deptid} value={dept.deptid}>
              {dept.deptname}
            </option>
          ))}
        </select>
        {errors.deptid && <div className="text-danger">{errors.deptid}</div>}
      </div>

      {/* Organization Name */}
      <div className="mb-3">
        <label className="form-label">Organization Name</label>
        <input
          name="orgname"
          className="form-control"
          placeholder="Organization Name"
          value={form.orgname}
          onChange={handleChange}
          required
        />
        {errors.orgname && <div className="text-danger">{errors.orgname}</div>}
      </div>

      {/* Email */}
      <div className="mb-3">
        <label className="form-label">Email</label>
        <input
          name="orgemail"
          type="email"
          className="form-control"
          placeholder="Email"
          value={form.orgemail}
          onChange={handleChange}
          required
        />
        {errors.orgemail && <div className="text-danger">{errors.orgemail}</div>}
      </div>

      {/* Contact */}
      <div className="mb-3">
        <label className="form-label">Contact</label>
        <input
          name="orgcontact"
          className="form-control"
          placeholder="Contact"
          value={form.orgcontact}
          onChange={handleChange}
          required
        />
        {errors.orgcontact && <div className="text-danger">{errors.orgcontact}</div>}
      </div>

      <div className="d-grid">
        <button type="submit" className="btn btn-primary">Add Organization</button>
      </div>
    </form>
  );
}

export default OrganizationForm;


