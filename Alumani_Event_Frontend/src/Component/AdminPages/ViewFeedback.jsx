import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ViewFeedback.css";

function ViewFeedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8766/feedback/with-details")
      .then((response) => {
        setFeedbacks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching feedback:", error);
        setFeedbacks([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="feedback-container">
      <h2>📝 Alumni Feedback</h2>
      {loading ? (
        <p>Loading...</p>
      ) : feedbacks.length === 0 ? (
        <p>No feedback found.</p>
      ) : (
        <table className="feedback-table">
          <thead>
            <tr>
              <th>Event Name</th>
              <th>Date</th>
              <th>Alumni Email</th>
              <th>Feedback</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((f) => (
              <tr key={f.fid}>
                <td>{f.eventName}</td>
                <td>{f.eventDate}</td>
                <td>{f.alumniEmail}</td>
                <td>{f.feedbackMsg}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ViewFeedback;
