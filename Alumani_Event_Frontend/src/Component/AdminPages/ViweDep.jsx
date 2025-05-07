import { useState, useEffect } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2"; // Import SweetAlert2
import "./ViweDep.css";

function ViweDep() {
  const [departments, setDepartments] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [editDept, setEditDept] = useState({ deptid: "", deptname: "" });
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
    // SweetAlert for confirmation
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this department!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(`http://localhost:8766/deleteDepartment/${id}`, {
          method: "DELETE",
        });
        const msg = await res.text();
        Swal.fire("Deleted!", msg, "success"); // Success alert
        fetchDepartments();
      } catch (err) {
        Swal.fire("Error!", "Failed to delete the department.", "error"); // Error alert
      }
    }
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch("http://localhost:8766/updateDepartment", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editDept),
      });
      const msg = await res.text();
      Swal.fire("Updated!", msg, "success"); // Success alert
      setEditDept({ deptid: "", deptname: "" });
      fetchDepartments();
    } catch (err) {
      console.error("Update failed:", err);
      Swal.fire("Error!", "Failed to update the department.", "error"); // Error alert
    }
  };

  return (
    <div className="view-dep-container">
      <h2 className="text-center mb-4">Manage Departments</h2>

      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search by Department Name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
      </div>

      {editDept?.deptid && (
        <div className="edit-section mb-4">
          <h4>Edit Department (ID: {editDept.deptid})</h4>
          <input
            className="form-control mb-2"
            value={editDept.deptname}
            onChange={(e) =>
              setEditDept({ ...editDept, deptname: e.target.value })
            }
          />
          <div>
            <button className="btn btn-success me-2" onClick={handleUpdate}>
              <FaEdit className="me-1" /> Update
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => setEditDept({ deptid: "", deptname: "" })}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

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
                <tr key={dept.deptid}>
                  <td>{dept.deptid}</td>
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
                      onClick={() => handleDelete(dept.deptid)}
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
