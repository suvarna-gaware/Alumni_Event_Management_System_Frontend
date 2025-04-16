import { useState, useEffect } from "react";
import "./ViweDep.css";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

function ViweDep() {
  const [departments, setDepartments] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [editDept, setEditDept] = useState({ did: "", deptname: "" });
  const [loading, setLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  // Fetch all departments
  const fetchDepartments = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8766/getDepartments");
      const data = await res.json();
      setDepartments(data);
    } catch (err) {
      console.error("Fetch error:", err);
      setDepartments([]);
    } finally {
      setLoading(false);
      setIsSearching(false);
    }
  };

  // Search department by name
  const searchDepartment = async (name) => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:8766/searchDepartmentByName/${name}`);
      const data = await res.json();
      setDepartments(data);
    } catch (err) {
      console.error("Search error:", err);
      setDepartments([]);
    } finally {
      setLoading(false);
      setIsSearching(true);
    }
  };

  // Debounce search effect
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchName.trim() === "") {
        fetchDepartments();
      } else {
        searchDepartment(searchName);
      }
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [searchName]);

  
  useEffect(() => {
    fetchDepartments();
  }, []);

  
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this department?")) return;
    const res = await fetch(`http://localhost:8766/deleteDepartment/${id}`, {
      method: "DELETE",
    });
    const msg = await res.text();
    alert(msg);
    fetchDepartments();
  };

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
      <h2 className="text-center mb-4">Manage Departments</h2>

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search by Department Name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
      </div>

      {/* Edit Form */}
      {editDept?.did && (
        <div className="edit-section mb-4">
          <h4>Edit Department (ID: {editDept.did})</h4>
          <input
            className="form-control mb-2"
            value={editDept.deptname}
            onChange={(e) =>
              setEditDept({ ...editDept, deptname: e.target.value })
            }
          />
          <button className="btn btn-success" onClick={handleUpdate}>
            <FaEdit className="me-1" /> Update
          </button>
        </div>
      )}

      {/* Department Table */}
      <h3 className="mb-3">Department List</h3>
      <div className="table-responsive">
        <table className="table table-striped table-bordered department-table">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Department Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="3">Loading...</td>
              </tr>
            ) : departments.length > 0 ? (
              departments.map((dept) => (
                <tr key={dept.did}>
                  <td>{dept.did}</td>
                  <td>{dept.deptname}</td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm me-2"
                      onClick={() => setEditDept(dept)}
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(dept.did)}
                      title="Delete"
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">
                  {isSearching
                    ? "No departments found."
                    : "No departments available."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViweDep;
