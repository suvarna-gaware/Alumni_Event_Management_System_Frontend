import { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "./ViewOrg.css";

const MySwal = withReactContent(Swal);

function ViewOrganization() {
  const [organizations, setOrganizations] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchAllOrganizations();
    fetchDepartments();
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchQuery.trim() === "") {
        fetchAllOrganizations();
      } else {
        handleSearchByName(searchQuery.trim());
      }
      setCurrentPage(1);
    }, 400);
    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  const fetchAllOrganizations = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8766/viweAllOrg");
      const data = await res.json();
      setOrganizations(data);
    } catch (err) {
      console.error("Error fetching organizations:", err);
      setOrganizations([]);
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
      const res = await fetch(`http://localhost:8766/searchOrgByname/${name}`);
      const data = await res.json();
      setOrganizations(data);
    } catch (err) {
      console.error("Search error:", err);
      setOrganizations([]);
    }
  };

  const deleteOrganization = async (orgid) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(`http://localhost:8766/deleteOrg/${orgid}`, {
          method: "DELETE",
        });
        if (res.ok) {
          Swal.fire("Deleted!", "Organizer has been deleted.", "success");
          fetchAllOrganizations();
        } else {
          Swal.fire("Error!", "Failed to delete organizer.", "error");
        }
      } catch (err) {
        console.error("Error deleting organizer:", err);
        Swal.fire("Error!", "Error deleting organizer.", "error");
      }
    }
  };

  const getDepartmentName = (deptid) => {
    const dept = departments.find((d) => d.deptid === deptid);
    return dept ? dept.deptname : "N/A";
  };

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentOrgs = organizations.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(organizations.length / itemsPerPage);

  const showUpdateModal = (org) => {
    MySwal.fire({
      title: "Update Organizer",
      html: (
        <UpdateForm
          org={org}
          departments={departments}
          onUpdateSuccess={() => {
            fetchAllOrganizations();
            MySwal.close();
          }}
        />
      ),
      showConfirmButton: false,
      width: "600px",
    });
  };

  return (
    <div className="view-organization-container mt-5">
      <h1>View Organizer</h1>

      <form onSubmit={(e) => e.preventDefault()} className="search-form">
        <div className="search-container">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search by Name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
      </form>

      <div className="organization-list">
        <table>
          <thead>
            <tr>
              <th>Sr No.</th>
              <th>Organizer Name</th>
              <th>Department</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="6">Loading...</td></tr>
            ) : currentOrgs.length === 0 ? (
              <tr><td colSpan="6">No organizers found.</td></tr>
            ) : (
              currentOrgs.map((org, index) => (
                <tr key={org.orgid}>
                  <td>{indexOfFirst + index + 1}</td>
                  <td>{org.orgname}</td>
                  <td>{getDepartmentName(org.deptid)}</td>
                  <td>{org.orgemail}</td>
                  <td>{org.orgcontact}</td>
                  <td>
                    <button onClick={() => showUpdateModal(org)} className="icon-button"><FaEdit /></button>
                    <button onClick={() => deleteOrganization(org.orgid)} className="icon-button delete"><FaTrash /></button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))} disabled={currentPage === 1}>Prev</button>
          {[...Array(totalPages)].map((_, i) => (
            <button key={i + 1} className={currentPage === i + 1 ? "active" : ""} onClick={() => setCurrentPage(i + 1)}>
              {i + 1}
            </button>
          ))}
          <button onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}>Next</button>
        </div>
      )}
    </div>
  );
}

function UpdateForm({ org, departments, onUpdateSuccess }) {
  const [formData, setFormData] = useState({ ...org });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "deptid" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8766/updateOrg", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const resultText = await res.text();

      if (res.ok) {
        Swal.fire("Success!", resultText, "success");
        onUpdateSuccess();
      } else {
        Swal.fire("Error!", "Failed to update organizer.", "error");
      }
    } catch (error) {
      console.error("Error during update:", error);
      Swal.fire("Error!", "Error updating organizer.", "error");
    }
  };

  return (
    <form className="update-form-modal" onSubmit={handleSubmit}>
      <select name="deptid" value={formData.deptid} onChange={handleChange} required>
        <option value="">Select Department</option>
        {departments.map((dept) => (
          <option key={dept.deptid} value={dept.deptid}>{dept.deptname}</option>
        ))}
      </select>

      <input type="text" name="orgname" placeholder="Organizer Name" value={formData.orgname} onChange={handleChange} required />
      <input type="email" name="orgemail" placeholder="Email" value={formData.orgemail} onChange={handleChange} required />
      <input type="text" name="orgcontact" placeholder="Contact" value={formData.orgcontact} onChange={handleChange} required />

      <div className="modal-buttons">
        <button type="submit" className="btn-update">Update</button>
        <button type="button" className="btn-cancel" onClick={() => Swal.close()}>Cancel</button>
      </div>
    </form>
  );
}

export default ViewOrganization;
