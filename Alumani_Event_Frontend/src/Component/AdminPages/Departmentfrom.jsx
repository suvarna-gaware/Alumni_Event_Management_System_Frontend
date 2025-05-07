import { useState } from "react";
import Swal from "sweetalert2";
import "./DepartmentForm.css"; 

function DepartmentForm() {
  const [form, setForm] = useState({ deptname: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8766/createDepartment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result = await response.text();
      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: result,
        });
        setForm({ deptname: "" });
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: "Failed to create department: " + result,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong!",
      });
    }
  };

  return (
    <div className="department-container">
      <form className="department-form" onSubmit={handleSubmit}>
        <h1>Add Department</h1>
        <input
          type="text"
          name="deptname"
          placeholder="Enter Department Name"
          value={form.deptname}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Department</button>
      </form>
    </div>
  );
}

export default DepartmentForm;
