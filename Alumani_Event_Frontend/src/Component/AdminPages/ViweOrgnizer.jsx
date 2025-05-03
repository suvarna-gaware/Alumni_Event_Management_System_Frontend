import { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import "./ViewOrg.css";

function ViewOrganization() {
  const [organizations, setOrganizations] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [updateForm, setUpdateForm] = useState({
    orgid: "",
    deptid: "",
    orgname: "",
    orgemail: "",
    orgcontact: "",
  });
  const [loading, setLoading] = useState(false);

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
    if (window.confirm("Are you sure you want to delete this organization?")) {
      try {
        const res = await fetch(`http://localhost:8766/deleteOrg/${orgid}`, {
          method: "DELETE",
        });
        if (res.ok) {
          alert("Organization deleted successfully!");
          fetchAllOrganizations();
          if (updateForm.orgid === orgid) {
            setUpdateForm({
              orgid: "",
              deptid: "",
              orgname: "",
              orgemail: "",
              orgcontact: "",
            });
          }
        } else {
          alert("Failed to delete organization.");
        }
      } catch (err) {
        console.error("Error deleting organization:", err);
        alert("Error deleting organization.");
      }
    }
  };

  const handleUpdateChange = (e) => {
    setUpdateForm({ ...updateForm, [e.target.name]: e.target.value });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      ...updateForm,
      orgid: Number(updateForm.orgid),
      deptid: Number(updateForm.deptid),
    };

    try {
      const res = await fetch("http://localhost:8766/updateOrg", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      const resultText = await res.text();

      if (res.ok) {
        alert(resultText);
        fetchAllOrganizations();
        setUpdateForm({
          orgid: "",
          deptid: "",
          orgname: "",
          orgemail: "",
          orgcontact: "",
        });
      } else {
        alert("Failed to update organization.");
      }
    } catch (error) {
      console.error("Error during update:", error);
      alert("Error updating organization.");
    }
  };

  const getDepartmentName = (deptid) => {
    const dept = departments.find((d) => d.deptid === deptid);
    return dept ? dept.deptname : "N/A";
  };

  return (
    <div className="view-organization-container">
      <h1>View Organizations</h1>

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
        <h2>All Organizations</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Organization Name</th>
              <th>Department</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6">Loading...</td>
              </tr>
            ) : (
              organizations.map((org) => (
                <tr key={org.orgid}>
                  <td>{org.orgid}</td>
                  <td>{org.orgname}</td>
                  <td>{getDepartmentName(org.deptid)}</td>
                  <td>{org.orgemail}</td>
                  <td>{org.orgcontact}</td>
                  <td>
                    <button
                      onClick={() => setUpdateForm({ ...org })}
                      className="icon-button"
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => deleteOrganization(org.orgid)}
                      className="icon-button"
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {updateForm.orgid && (
        <div className="update-form">
          <h2>Update Organization</h2>
          <form onSubmit={handleUpdateSubmit}>
            <select
              name="deptid"
              value={updateForm.deptid}
              onChange={handleUpdateChange}
              required
            >
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept.deptid} value={dept.deptid}>
                  {dept.deptname}
                </option>
              ))}
            </select>

            <input
              type="text"
              name="orgname"
              placeholder="Organization Name"
              value={updateForm.orgname}
              onChange={handleUpdateChange}
              required
            />
            <input
              type="email"
              name="orgemail"
              placeholder="Organization Email"
              value={updateForm.orgemail}
              onChange={handleUpdateChange}
              required
            />
            <input
              type="text"
              name="orgcontact"
              placeholder="Organization Contact"
              value={updateForm.orgcontact}
              onChange={handleUpdateChange}
              required
            />

            <button type="submit">Update Organization</button>
            <button type="button" onClick={() => setUpdateForm({ orgid: "" })}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default ViewOrganization;
