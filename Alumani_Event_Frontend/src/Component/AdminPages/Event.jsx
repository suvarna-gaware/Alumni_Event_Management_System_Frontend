import { useState } from "react";
import "./EventForm.css"; // Make sure this path is correct

function EventForm({ onSubmit }) {
  const [form, setForm] = useState({
    org_id: "",
    ename: "",
    Dates: "",
    Description: "",
    venue: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form className="event-form" onSubmit={handleSubmit}>
      <input name="org_id" placeholder="Organizer ID" onChange={handleChange} />
      <input name="ename" placeholder="Event Name" onChange={handleChange} required />
      <input name="Dates" type="date" onChange={handleChange} required />
      <input name="Description" placeholder="Description" onChange={handleChange} required />
      <input name="venue" placeholder="Venue" onChange={handleChange} required />
      <button type="submit">Create Event</button>
    </form>
  );
}

export default EventForm;
