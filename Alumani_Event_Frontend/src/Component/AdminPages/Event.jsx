import { useState } from "react";
import "./EventForm.css";
import axios from "axios";

function EventForm() {
  const [form, setForm] = useState({
    orgid: "",
    ename: "",
    dates: "",
    description: "",
    venue: ""
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Form submitted:", form);
      const response = await axios.post("http://localhost:8766/createEvent", form);
      console.log("Server response:", response.data);
      alert("Event created successfully!");
      setForm({
        orgid: "",
        ename: "",
        dates: "",
        description: "",
        venue: ""
      });
    } catch (error) {
      console.error("Error submitting event:", error);
      alert("Failed to create event.");
    }
  };

  return (
    <div className="event-container">
      <form className="event-form" onSubmit={handleSubmit}>
        <h1>Create Event</h1>

        <input
          name="orgid"
          placeholder="Organizer ID"
          value={form.orgid}
          onChange={handleChange}
          required
        />
        <input
          name="ename"
          placeholder="Event Name"
          value={form.ename}
          onChange={handleChange}
          required
        />
        <input
          name="dates"
          type="date"
          value={form.dates}
          onChange={handleChange}
          required
        />
        <input
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        />
        <input
          name="venue"
          placeholder="Venue"
          value={form.venue}
          onChange={handleChange}
          required
        />
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
}

export default EventForm;
