import { useState } from "react";
import './OrganizationForm.css'; 

function OrganizationForm({ onSubmit }) {
  const [form, setForm] = useState({
    Did: "",
    org_name: "",
    org_email: "",
    org_contact: "",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form className="organization-form" onSubmit={handleSubmit}>
      <h2>Add Organization</h2>
      <input name="Did" placeholder="Department ID" onChange={handleChange} />
      <input name="org_name" placeholder="Organization Name" onChange={handleChange} required />
      <input name="org_email" type="email" placeholder="Email" onChange={handleChange} required />
      <input name="org_contact" placeholder="Contact" onChange={handleChange} required />
      <button type="submit">Add Organization</button>
    </form>
  );
}

export default OrganizationForm;
