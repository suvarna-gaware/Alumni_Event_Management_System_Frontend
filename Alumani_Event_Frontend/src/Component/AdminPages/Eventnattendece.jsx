import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const AddAttendance = () => {
  // States for departments, events, alumni, loading & form data
  const [departments, setDepartments] = useState([]);
  const [events, setEvents] = useState([]);
  const [filteredAlumni, setFilteredAlumni] = useState([]);
  const [loadingAlumni, setLoadingAlumni] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [selectedAlumni, setSelectedAlumni] = useState([]);

  const [formData, setFormData] = useState({
    deptid: '',
    eventid: '',
    year: '',
    status: 'not attended',
  });

  // Load departments on component mount
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await axios.get('http://localhost:8766/getDepartments');
        setDepartments(res.data);
      } catch (error) {
        console.error(error);
        Swal.fire('Error', 'Failed to load departments.', 'error');
      }
    };
    fetchDepartments();
  }, []);

  // Load events filtered by selected department
  useEffect(() => {
    if (!formData.deptid) {
      setEvents([]);
      setFormData((prev) => ({ ...prev, eventid: '' }));
      return;
    }

    const dept = departments.find((d) => d.deptid === Number(formData.deptid));
    if (!dept) {
      setEvents([]);
      setFormData((prev) => ({ ...prev, eventid: '' }));
      return;
    }

    axios
      .get(`http://localhost:8766/by-department/${encodeURIComponent(dept.deptname)}`)
      .then((res) => {
        setEvents(res.data);
        setFormData((prev) => ({ ...prev, eventid: '' }));
      })
      .catch(() => {
        setEvents([]);
        setFormData((prev) => ({ ...prev, eventid: '' }));
        Swal.fire('Error', 'Failed to load events for the selected department.', 'error');
      });
  }, [formData.deptid, departments]);

  // Fetch alumni when dept, event and year are selected
  useEffect(() => {
    const { deptid, eventid, year } = formData;
    if (deptid && eventid && year) {
      setLoadingAlumni(true);
      axios
        .get('http://localhost:8766/api/alumniAttendance', {
          params: { deptId: deptid, eventId: eventid, passoutYear: year },
        })
        .then((res) => {
          setFilteredAlumni(res.data);
          setLoadingAlumni(false);
          setSelectedAlumni([]); // clear selected alumni on change
        })
        .catch(() => {
          Swal.fire('Error', 'Error loading alumni list.', 'error');
          setFilteredAlumni([]);
          setLoadingAlumni(false);
        });
    } else {
      setFilteredAlumni([]);
      setSelectedAlumni([]);
    }
  }, [formData.deptid, formData.eventid, formData.year]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Toggle attendance status: attended/not attended
  const toggleStatus = () => {
    setFormData((prev) => ({
      ...prev,
      status: prev.status === 'attended' ? 'not attended' : 'attended',
    }));
  };

  // Handle alumni checkbox toggle
  const handleAlumniCheck = (id) => {
    const numericId = Number(id);
    setSelectedAlumni((prev) =>
      prev.includes(numericId) ? prev.filter((a) => a !== numericId) : [...prev, numericId]
    );
  };

  // Submit attendance update
 const handleUpdateAttendance = async () => {
  if (selectedAlumni.length === 0) {
    Swal.fire('Warning', 'Please select at least one alumni.', 'warning');
    return;
  }

  const payloads = selectedAlumni.map((alumniid) => ({
    eventid: Number(formData.eventid),
    deptid: Number(formData.deptid),
    alumniid: Number(alumniid),
    status: formData.status,
  }));

  setSubmitting(true);

  try {
    const res = await axios.post(
      'http://localhost:8766/api/updateAttendance',
      payloads // send full list
    );
    Swal.fire('Success', res.data || 'Attendance updated successfully.', 'success');
  } catch (error) {
    Swal.fire('Error', 'Attendance update failed.', 'error');
  }

  // Reset
  setFormData({ deptid: '', eventid: '', year: '', status: 'not attended' });
  setFilteredAlumni([]);
  setSelectedAlumni([]);
  setSubmitting(false);
};


  // Generate passout years dropdown (last 50 years)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

  return (
    <div className="container mt-5">
      <h3 className="mb-4">Add / Update Event Attendance</h3>

      <form className="p-4 rounded shadow-sm bg-light">
        {/* Department Dropdown */}
        <div className="mb-3">
          <label className="form-label">Department</label>
          <select
            name="deptid"
            className="form-select"
            value={formData.deptid}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Department --</option>
            {departments.map((d) => (
              <option key={d.deptid} value={d.deptid}>
                {d.deptname}
              </option>
            ))}
          </select>
        </div>

        {/* Passout Year Dropdown */}
        <div className="mb-3">
          <label className="form-label">Passout Year</label>
          <select
            name="year"
            className="form-select"
            value={formData.year}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Year --</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>

        {/* Event Dropdown filtered by Department */}
        <div className="mb-3">
          <label className="form-label">Event</label>
          <select
            name="eventid"
            className="form-select"
            value={formData.eventid}
            onChange={handleChange}
            disabled={events.length === 0}
            required
          >
            <option value="">-- Select Event --</option>
            {events.map((e) => (
              <option key={e.eventid} value={e.eventid}>
                {e.eventname}
              </option>
            ))}
          </select>
        </div>

        {/* Alumni List */}
        {filteredAlumni.length > 0 ? (
          <div className="mb-3 mt-4">
            <label className="form-label">Alumni List</label>
            <div
              className="border rounded p-3"
              style={{ maxHeight: '200px', overflowY: 'auto' }}
            >
              {filteredAlumni.map((a) => (
                <div className="form-check" key={a.alumniid}>
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={`alumni-${a.alumniid}`}
                    checked={selectedAlumni.includes(a.alumniid)}
                    onChange={() => handleAlumniCheck(a.alumniid)}
                  />
                  <label className="form-check-label" htmlFor={`alumni-${a.alumniid}`}>
                    {a.name} — <small className="text-muted">{a.status}</small>
                  </label>
                </div>
              ))}
            </div>
          </div>
        ) : (
          formData.eventid &&
          formData.deptid &&
          formData.year && (
            <p className="text-muted">{loadingAlumni ? 'Loading alumni...' : 'No alumni found for selected criteria.'}</p>
          )
        )}

        {/* Attendance status toggle */}
        {selectedAlumni.length > 0 && (
          <div className="mb-3 d-flex align-items-center">
            <label className="form-label me-3 mb-0">Attendance:</label>
            <div className="form-check form-switch">
              <input
                type="checkbox"
                className="form-check-input"
                id="toggleAttendance"
                checked={formData.status === 'attended'}
                onChange={toggleStatus}
              />
              <label className="form-check-label ms-2" htmlFor="toggleAttendance">
                {formData.status === 'attended' ? 'Present' : 'Absent'}
              </label>
            </div>
          </div>
        )}

        {/* Submit button */}
        <button
          type="button"
          className="btn btn-primary w-100"
          disabled={submitting}
          onClick={handleUpdateAttendance}
        >
          {submitting ? 'Submitting...' : 'Submit Attendance'}
        </button>
      </form>
    </div>
  );
};

export default AddAttendance;
