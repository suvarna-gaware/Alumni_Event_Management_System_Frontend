import { useState, useEffect } from "react";
import { FaSearch, FaEdit, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "./ViewAlumni.css";

const MySwal = withReactContent(Swal);

function ViewAlumni() {
  const [alumni, setAlumni] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

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
      setCurrentPage(1); // reset page on search
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

  // Pagination logic
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentAlumni = alumni.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(alumni.length / recordsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getDepartmentName = (deptid) => {
    const dept = departments.find((d) => d.deptid === deptid);
    return dept ? dept.deptname : "N/A";
  };

  // Delete function remains the same...

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

  // Function to open update modal popup using SweetAlert2
  const handleEditClick = (alumniData) => {
    MySwal.fire({
      title: `Edit Alumni (ID: ${alumniData.alumniid})`,
      html: `
        <input id="name" class="swal2-input" placeholder="Name" value="${alumniData.name || ''}">
        <input id="email" type="email" class="swal2-input" placeholder="Email" value="${alumniData.email || ''}">
        <input id="contact" class="swal2-input" placeholder="Contact" value="${alumniData.contact || ''}">
        <input id="address" class="swal2-input" placeholder="Address" value="${alumniData.address || ''}">
        <select id="deptid" class="swal2-select">
          ${departments
            .map(
              (dept) =>
                `<option value="${dept.deptid}" ${
                  dept.deptid === alumniData.deptid ? "selected" : ""
                }>${dept.deptname}</option>`
            )
            .join("")}
        </select>
        <select id="gender" class="swal2-select">
          <option value="Male" ${alumniData.gender === "Male" ? "selected" : ""}>Male</option>
          <option value="Female" ${alumniData.gender === "Female" ? "selected" : ""}>Female</option>
          <option value="Other" ${alumniData.gender === "Other" ? "selected" : ""}>Other</option>
        </select>
        <input id="year" type="number" class="swal2-input" placeholder="Year" value="${alumniData.year || ''}">
        <select id="status" class="swal2-select">
          <option value="Yes" ${alumniData.status === "Yes" ? "selected" : ""}>Yes</option>
          <option value="No" ${alumniData.status === "No" ? "selected" : ""}>No</option>
        </select>
      `,
      focusConfirm: false,
      showCancelButton: true,
      preConfirm: () => {
        return {
          alumniid: alumniData.alumniid,
          name: document.getElementById("name").value,
          email: document.getElementById("email").value,
          contact: document.getElementById("contact").value,
          address: document.getElementById("address").value,
          deptid: parseInt(document.getElementById("deptid").value),
          gender: document.getElementById("gender").value,
          year: parseInt(document.getElementById("year").value),
          status: document.getElementById("status").value,
        };
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`http://localhost:8766/updateAlumni`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(result.value),
          });
          const msg = await res.text();
          Swal.fire("Updated!", msg, "success");
          fetchAllAlumni();
        } catch (err) {
          console.error("Update error:", err);
          Swal.fire("Error!", "There was an error updating the alumni.", "error");
        }
      }
    });
  };

  const renderPageNumbers = () => {
    const pages = [];
    for(let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => paginate(i)}
          className={currentPage === i ? "active-page" : ""}
        >
          {i}
        </button>
      );
    }
    return pages;
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

      <div className="alumni-table-container">
        {loading ? (
          <p>Loading...</p>
        ) : alumni.length > 0 ? (
          <>
            <table className="alumni-table">
              <thead>
                <tr>
                  <th>Sr No</th>
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
                {currentAlumni.map((a) => (
                  <tr key={a.alumniid}>
                    <td>{indexOfFirstRecord + currentAlumni.indexOf(a) + 1}</td>
                    <td>{a.name}</td>
                    <td>{a.email}</td>
                    <td>{a.contact}</td>
                    <td>{getDepartmentName(a.deptid)}</td>
                    <td>{a.gender}</td>
                    <td>{a.address}</td>
                    <td>{a.year}</td>
                    <td>{a.status}</td>
                    <td>
                      <button className="edit-button" onClick={() => handleEditClick(a)}>
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

            <div className="pagination">
              <button
                onClick={() => currentPage > 1 && paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Prev
              </button>

              {renderPageNumbers()}

              <button
                onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <p>No alumni records found.</p>
        )}
      </div>
    </div>
  );
}

export default ViewAlumni;
