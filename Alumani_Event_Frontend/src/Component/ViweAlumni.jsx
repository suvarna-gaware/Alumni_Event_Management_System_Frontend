import { useState, useEffect } from "react";
import { FaSearch, FaEdit, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import "./ViewAlumni.css";

function ViewAlumni() {
  const [alumni, setAlumni] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editAlumni, setEditAlumni] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAllAlumni();
    fetchDepartments();
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchQuery.trim() === "") {
        fetchAllAlumni();
      } else {
        handleSearchByName(searchQuery.trim());
      }
    }, 400);
    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  const fetchAllAlumni = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8766/viewAllAlumni");
      const data = await res.json();
      setAlumni(data);
    } catch (err) {
      console.error("Error fetching alumni:", err);
      setAlumni([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchDepartments = async () => {
    try {
      const res = await fetch("http://localhost:8766/getDepartments");
      const data = await res.json();
      setDepartments(data);
    } catch (err) {
      console.error("Error fetching departments:", err);
    }
  };

  const handleSearchByName = async (name) => {
    try {
      const res = await fetch(`http://localhost:8766/searchAlumniByName/${name}`);
      const data = await res.json();
      setAlumni(data);
    } catch (err) {
      console.error("Search error:", err);
      setAlumni([]);
    }
  };

  const handleDelete = async (alumniid) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this alumni record?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(`http://localhost:8766/deleteAlumni/${alumniid}`, {
          method: "DELETE",
        });
        if (res.ok) {
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "Alumni deleted successfully.",
          });
          fetchAllAlumni();
        } else {
          Swal.fire({
            icon: "error",
            title: "Failed",
            text: "Failed to delete alumni.",
          });
        }
      } catch (err) {
        console.error("Delete error:", err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error deleting alumni.",
        });
      }
    }
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch(`http://localhost:8766/updateAlumni`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editAlumni),
      });
      const msg = await res.text();
      Swal.fire("Updated!", msg, "success");
      setEditAlumni(null);
      fetchAllAlumni();
    } catch (err) {
      console.error("Update error:", err);
      Swal.fire("Error!", "There was an error updating the alumni.", "error");
    }
  };

  const handleChange = (e) => {
    setEditAlumni({ ...editAlumni, [e.target.name]: e.target.value });
  };

  const getDepartmentName = (deptid) => {
    const dept = departments.find((d) => d.deptid === deptid);
    return dept ? dept.deptname : "N/A";
  };

  return (
    <div className="view-alumni-container">
      <h1>Manage Alumni</h1>

      <div className="modern-search-box">
        <FaSearch className="modern-search-icon" />
        <input
          type="text"
          className="modern-search-input"
          placeholder="Search by Alumni Name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {editAlumni && (
        <div className="edit-section">
          <h4>Edit Alumni (ID: {editAlumni.alumniid})</h4>
          <input name="name" value={editAlumni.name} onChange={handleChange} placeholder="Name" />
          <input name="email" value={editAlumni.email} onChange={handleChange} placeholder="Email" type="email" />
          <input name="contact" value={editAlumni.contact} onChange={handleChange} placeholder="Contact" />
          <input name="address" value={editAlumni.address} onChange={handleChange} placeholder="Address" />
          <select name="deptid" value={editAlumni.deptid} onChange={handleChange}>
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept.deptid} value={dept.deptid}>{dept.deptname}</option>
            ))}
          </select>
          <select name="gender" value={editAlumni.gender} onChange={handleChange}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <input name="year" value={editAlumni.year} onChange={handleChange} placeholder="Year" type="number" />
          <select name="status" value={editAlumni.status} onChange={handleChange}>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
          <div className="edit-buttons">
            <button onClick={handleUpdate}>Update</button>
            <button className="cancel-btn" onClick={() => setEditAlumni(null)}>Cancel</button>
          </div>
        </div>
      )}

      <div className="alumni-table-container">
        {loading ? (
          <p>Loading...</p>
        ) : alumni.length > 0 ? (
          <table className="alumni-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Contact</th>
                <th>Department</th>
                <th>Gender</th>
                <th>Address</th>
                <th>Year</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {alumni.map((a) => (
                <tr key={a.alumniid}>
                  <td>{a.alumniid}</td>
                  <td>{a.name}</td>
                  <td>{a.email}</td>
                  <td>{a.contact}</td>
                  <td>{getDepartmentName(a.deptid)}</td>
                  <td>{a.gender}</td>
                  <td>{a.address}</td>
                  <td>{a.year}</td>
                  <td>{a.status}</td>
                  <td>
                    <button className="edit-button" onClick={() => setEditAlumni(a)}>
                      <FaEdit />
                    </button>
                    <button className="delete-button" onClick={() => handleDelete(a.alumniid)}>
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No alumni records found.</p>
        )}
      </div>
    </div>
  );
}

export default ViewAlumni;
