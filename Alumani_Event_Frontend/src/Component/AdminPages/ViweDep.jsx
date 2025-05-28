import { useState, useEffect } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import "./ViweDep.css";

function ViweDep() {
  const [departments, setDepartments] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

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
      setCurrentPage(1); // Reset page on new search
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [searchName]);

  useEffect(() => {
    fetchDepartments();
  }, []);

  // Delete department
  const handleDelete = async (id) => {
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
        Swal.fire("Deleted!", msg, "success");
        fetchDepartments();
      } catch (err) {
        Swal.fire("Error!", "Failed to delete the department.", "error");
      }
    }
  };

  // Edit department with SweetAlert popup
  const handleEdit = async (dept) => {
    const { value: newDeptName } = await Swal.fire({
      title: "Update Department Name",
      input: "text",
      inputLabel: "Department Name",
      inputValue: dept.deptname,
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "Department name is required!";
        }
      },
    });

    if (newDeptName) {
      try {
        const res = await fetch("http://localhost:8766/updateDepartment", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ deptid: dept.deptid, deptname: newDeptName }),
        });
        const msg = await res.text();
        if (res.ok) {
          Swal.fire("Updated!", msg, "success");
          fetchDepartments();
        } else {
          Swal.fire("Failed", msg, "error");
        }
      } catch (err) {
        Swal.fire("Error!", "Failed to update the department.", "error");
      }
    }
  };

  // Pagination logic
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentDepartments = departments.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(departments.length / recordsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="view-dep-container">
      <h2 className="text-center mb-4 mt-4">Manage Departments</h2>

      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search by Department Name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
      </div>

      <h3 className="mb-3">Department List</h3>
      <div className="table-responsive">
        <table className="table table-striped table-bordered department-table">
          <thead className="table-dark">
            <tr>
              <th>Sr No</th>
              <th>Department Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="3">Loading...</td>
              </tr>
            ) : currentDepartments.length > 0 ? (
              currentDepartments.map((dept, idx) => (
                <tr key={dept.deptid}>
                  <td>{indexOfFirstRecord + idx + 1}</td>
                  <td>{dept.deptname}</td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm me-2"
                      onClick={() => handleEdit(dept)}
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

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => currentPage > 1 && paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="page-btn"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => paginate(i + 1)}
              className={`page-btn ${currentPage === i + 1 ? "active-page" : ""}`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="page-btn"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default ViweDep;
