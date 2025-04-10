import { useState } from "react";
import "./AlumniForm.css"; // Make sure this path matches your project structure

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
    <form className="alumni-form" onSubmit={handleSubmit}>
      <input name="Did" placeholder="Department ID" onChange={handleChange} />
      <input name="alumni_name" placeholder="Alumni Name" onChange={handleChange} required />
      <input name="gender" placeholder="Gender" onChange={handleChange} required />
      <input name="passout_year" placeholder="Passout Year" onChange={handleChange} required />
      <input name="address" placeholder="Address" onChange={handleChange} required />
      <input name="alumni_email" placeholder="Email" onChange={handleChange} />
      <input name="contact" placeholder="Contact" onChange={handleChange} required />
      <button type="submit">Add Alumni</button>
    </form>
  );
}

export default AlumniForm;
