import { useState, useEffect } from "react";
import "./ViweDep.css";
import { FaSearch, FaEdit, FaTrashAlt } from "react-icons/fa";

function ViweDep() {
  const [departments, setDepartments] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [editDept, setEditDept] = useState({ did: "", deptname: "" });
  const [isSearching, setIsSearching] = useState(false);

  // Fetch all departments
  const fetchDepartments = async () => {
    try {
      const res = await fetch("http://localhost:8766/getDepartments");
      const data = await res.json();
      setDepartments(data);
      setIsSearching(false);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  // Delete department
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this department?")) return;
    const res = await fetch(`http://localhost:8766/deleteDepartment/${id}`, {
      method: "DELETE",
    });
    const msg = await res.text();
    alert(msg);
    fetchDepartments();
  };

  // Search department by ID
  const handleSearch = async () => {
    if (!searchId) return;
    try {
      const res = await fetch(`http://localhost:8766/searchDepartmentiById/${searchId}`);
      const data = await res.json();
      setDepartments([data]); // Show only searched department
      setIsSearching(true);
    } catch (err) {
      alert("Department not found.");
    }
  };

  // Reset to full list
  const handleReset = () => {
    setSearchId("");
    fetchDepartments();
  };

  // Update department
  const handleUpdate = async () => {
    try {
      const res = await fetch("http://localhost:8766/updateDepartment", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editDept),
      });
      const msg = await res.text();
      alert(msg);
      setEditDept({ did: "", deptname: "" });
      fetchDepartments();
    } catch (err) {
      alert("Failed to update.");
    }
  };

  return (
    <div className="view-dep-container">
      <h2>Manage Departments</h2>

      {/* Search Section */}
      <div className="search-wrapper">
        <FaSearch className="search-icon" />
        <input
          type="text"
          className="search-input"
          placeholder="Search by ID..."
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button onClick={handleSearch} className="search-btn">Search</button>
        {isSearching && (
          <button onClick={handleReset} className="reset-btn">Reset</button>
        )}
      </div>

      {/* Edit Form */}
      {editDept?.did && (
        <div className="edit-section">
          <h4>Edit Department (ID: {editDept.did})</h4>
          <input
            value={editDept.deptname}
            onChange={(e) => setEditDept({ ...editDept, deptname: e.target.value })}
          />
          <button onClick={handleUpdate} title="Update">
            <FaEdit /> Update
          </button>
        </div>
      )}

      {/* Department List */}
      <h3>Department List</h3>
      <ul className="department-list">
        {departments.map((dept) => (
          <li key={dept.did} className="department-item">
            <span>
              <strong>ID {dept.did}:</strong> {dept.deptname}
            </span>
            <div className="action-buttons">
              <button
                className="edit-button"
                onClick={() => setEditDept(dept)}
                title="Edit"
              >
                <FaEdit />
              </button>
              <button
                className="delete-button"
                onClick={() => handleDelete(dept.did)}
                title="Delete"
              >
                <FaTrashAlt />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ViweDep;
