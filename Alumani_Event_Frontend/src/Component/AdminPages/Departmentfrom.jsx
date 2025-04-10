import { useState } from "react";
import "./DepartmentForm.css"; // Make sure the path is correct

function DepartmentForm({ onSubmit }) {
  const [form, setForm] = useState({
    deptname: "",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form className="department-form" onSubmit={handleSubmit}>
      <input name="deptname" placeholder="Department Name" onChange={handleChange} required />
      <button type="submit">Add Department</button>
    </form>
  );
}

export default DepartmentForm;
