import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "./EventForm.css";

function EventForm() {
  const [form, setForm] = useState({
    deptid: "",
    eventname: "",
    eventdate: "",
    eventtime: "",
    location: "",
  });

  const [departments, setDepartments] = useState([]);
  const [loadingDepartments, setLoadingDepartments] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8766/getDepartments")
      .then((res) => {
        console.log("Departments fetched:", res.data);
        setDepartments(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch departments:", err);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to load departments. Please try again later.",
        });
      })
      .finally(() => {
        setLoadingDepartments(false);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.deptid) {
      Swal.fire({
        icon: "warning",
        title: "Missing Department",
        text: "Please select a department.",
      });
      return;
    }

    const payload = {
      deptid: parseInt(form.deptid, 10),
      eventname: form.eventname.trim(),
      eventdate: form.eventdate,
      eventtime: form.eventtime,
      location: form.location.trim(),
    };

    console.log("Submitting payload:", payload);

    try {
      const response = await axios.post("http://localhost:8766/createEvent", payload);
      Swal.fire({
        icon: "success",
        title: "Event Created",
        text: response.data,
      });

      setForm({
        deptid: "",
        eventname: "",
        eventdate: "",
        eventtime: "",
        location: "",
      });
    } catch (error) {
      console.error("Error submitting event:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to create event. Please check the details and try again.",
      });
    }
  };

  return (
    <div className="event-container">
      <form className="event-form" onSubmit={handleSubmit}>
        <div className="form-header">
          <h1>Create Event</h1>
            </div>

        <label htmlFor="deptid">Select Department</label>
        <select
          id="deptid"
          name="deptid"
          value={form.deptid}
          onChange={handleChange}
          required
        >
          <option value="">-- Choose Department --</option>
          {loadingDepartments ? (
            <option disabled>Loading departments...</option>
          ) : departments.length > 0 ? (
            departments.map((dept) => (
              <option key={dept.did || dept.Did || dept.deptid} value={dept.did || dept.Did || dept.deptid}>
                {dept.dname || dept.Dname || dept.deptname}
              </option>
            ))
          ) : (
            <option disabled>No departments found</option>
          )}
        </select>

        <label htmlFor="eventname">Event Name</label>
        <input
          id="eventname"
          name="eventname"
          placeholder="Enter Event Name"
          value={form.eventname}
          onChange={handleChange}
          required
        />

        <label htmlFor="eventdate">Event Date</label>
        <input
          id="eventdate"
          name="eventdate"
          type="date"
          value={form.eventdate}
          onChange={handleChange}
          required
        />

        <label htmlFor="eventtime">Event Time</label>
        <input
          id="eventtime"
          name="eventtime"
          type="time"
          value={form.eventtime}
          onChange={handleChange}
          required
        />

        <label htmlFor="location">Location</label>
        <input
          id="location"
          name="location"
          placeholder="Enter Location"
          value={form.location}
          onChange={handleChange}
          required
        />

        <button type="submit" className="submit-button">
          Create Event
        </button>
      </form>
    </div>
  );
}

export default EventForm;
