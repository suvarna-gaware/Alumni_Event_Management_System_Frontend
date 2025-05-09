import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import "./FeedbackForm.css"; // Optional: for styling

function FeedbackForm() {
  const location = useLocation();
  const initialAlumni = location.state?.alumni;
  const [alumniId, setAlumniId] = useState(null);
  const [events, setEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState("");
  const [feedbackMsg, setFeedbackMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // Load alumniId from state or localStorage
  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem("alumniData"));
    const id = initialAlumni?.alumniid || localData?.alumniid;
    if (id) {
      setAlumniId(id);
    } else {
      Swal.fire("Error", "Alumni data not found!", "error");
    }
  }, [initialAlumni]);

  // Fetch events for alumni department
  useEffect(() => {
    if (!alumniId) return;

    const fetchEvents = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:8766/events/${alumniId}`);
        if (!res.ok) throw new Error("Failed to fetch events.");
        const data = await res.json();
        setEvents(data);
      } catch (err) {
        console.error("Fetch error:", err);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [alumniId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedEventId || !feedbackMsg.trim()) {
      return Swal.fire("Warning", "Please fill in all fields.", "warning");
    }

    const payload = {
      alumniId,
      eventId: selectedEventId,
      feedbackmsg: feedbackMsg,
    };

    try {
      const res = await fetch("http://localhost:8766/createFeedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Feedback submission failed");

      Swal.fire("Success", "Feedback submitted!", "success");
      setFeedbackMsg("");
      setSelectedEventId("");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to submit feedback.", "error");
    }
  };

  return (
    <div className="feedback-form-container">
      <h2>📝 Submit Feedback</h2>
      {loading ? (
        <p>Loading events...</p>
      ) : (
        <form onSubmit={handleSubmit} className="feedback-form">
          <label>Choose Event:</label>
          <select
            value={selectedEventId}
            onChange={(e) => setSelectedEventId(e.target.value)}
          >
            <option value="">-- Select an event --</option>
            {events.map((event) => (
              <option key={event.eventid} value={event.eventid}>
                {event.eventname} ({event.eventdate})
              </option>
            ))}
          </select>

          <label>Feedback:</label>
          <textarea
            value={feedbackMsg}
            onChange={(e) => setFeedbackMsg(e.target.value)}
            placeholder="Write your feedback here..."
          ></textarea>

          <button type="submit">Submit Feedback</button>
        </form>
      )}
    </div>
  );
}

export default FeedbackForm;
