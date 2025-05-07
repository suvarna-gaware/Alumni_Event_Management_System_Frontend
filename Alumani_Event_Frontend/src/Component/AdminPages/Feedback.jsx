import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    Alumni_id: '',
    feedback_text: '',
    rating: ''
  });

  const [alumni, setAlumni] = useState([]);

  
  useEffect(() => {
    const fetchAlumni = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/alumni');
        setAlumni(res.data);
      } catch (error) {
        console.error('Error fetching alumni data:', error);
      }
    };

    fetchAlumni();
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/feedback', formData);
      alert("Feedback submitted successfully!");
      setFormData({ Alumni_id: '', feedback_text: '', rating: '' });
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert("Error submitting feedback.");
    }
  };

  return (
    <div className="container mt-5 col-md-6">
      <h3 className="mb-4 text-center">Feedback Form</h3>
      <form onSubmit={handleSubmit} className="border p-4 rounded shadow-sm bg-light">

        <div className="mb-3">
          <label htmlFor="Alumni_id" className="form-label">Select Alumni</label>
          <select
            className="form-select"
            id="Alumni_id"
            name="Alumni_id"
            value={formData.Alumni_id}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Alumni --</option>
            {alumni.map((al) => (
              <option key={al.Alumni_id} value={al.Alumni_id}>
                {al.alumni_name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="feedback_text" className="form-label">Feedback</label>
          <textarea
            className="form-control"
            id="feedback_text"
            name="feedback_text"
            rows="4"
            value={formData.feedback_text}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="rating" className="form-label">Rating (1 to 5)</label>
          <input
            type="number"
            className="form-control"
            id="rating"
            name="rating"
            min="1"
            max="5"
            value={formData.rating}
            onChange={handleChange}
            required
          />
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">Submit Feedback</button>
        </div>

      </form>
    </div>
  );
};

export default FeedbackForm;
