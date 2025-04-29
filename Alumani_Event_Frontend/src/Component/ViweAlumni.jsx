import { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa"; // Importing the icons from react-icons
import "./ViewAlumni.css";

function ViewAlumni() {
  const [alumni, setAlumni] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [updateForm, setUpdateForm] = useState({
    alumniid: "",
    deptid: "",
    name: "",
    email: "",
    contact: "",
    address: "",
    gender: "",
    year: "",
    status: "",  // Status is either "Yes" or "No"
  });
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
      if (!res.ok) throw new Error("Failed to fetch alumni");
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
      const res = await fetch(`http://localhost:8766/searchAlumniByName/${name}`, {
        method: "GET", // Change to GET request
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!res.ok) throw new Error("Search fetch failed");
  
      const data = await res.json();
      setAlumni(data);  // Set the alumni data in your state
    } catch (err) {
      console.error("Search error:", err);
      setAlumni([]);  // Clear alumni data on error
    }
  };
  

  const deleteAlumni = async (alumniid) => {
    if (window.confirm("Are you sure you want to delete this alumni?")) {
      try {
        const res = await fetch(`http://localhost:8766/deleteAlumni/${alumniid}`, {
          method: "DELETE",
        });
        if (res.ok) {
          alert("Alumni deleted successfully!");
          fetchAllAlumni();  // Re-fetch the list after deletion
        } else {
          alert("Failed to delete alumni.");
        }
      } catch (err) {
        console.error("Error deleting alumni:", err);
        alert("Error deleting alumni.");
      }
    }
  };

  const handleUpdateChange = (e) => {
    setUpdateForm({ ...updateForm, [e.target.name]: e.target.value });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8766/updateAlumni", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateForm),
      });

      if (response.ok) {
        alert("Alumni updated successfully!");
        fetchAllAlumni();
        setUpdateForm({
          alumniid: "",
          deptid: "",
          name: "",
          email: "",
          contact: "",
          address: "",
          gender: "",
          year: "",
          status: "", // Reset status to default
        });
      } else {
        alert("Failed to update alumni.");
      }
    } catch (error) {
      console.error("Error updating alumni:", error);
      alert("Error updating alumni.");
    }
  };

  const getDepartmentName = (deptid) => {
    const dept = departments.find((d) => d.deptid === deptid);
    return dept ? dept.deptname : "N/A";
  };

  return (
    <div className="view-alumni-container">
      <h1>View Alumni</h1>

      {/* Search Form */}
      <form onSubmit={(e) => e.preventDefault()} className="search-form">
        <div className="search-input-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search by Name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </form>

      {/* Alumni List */}
      <div className="alumni-list">
        <h2>All Alumni</h2>
        <table>
          <thead>
            <tr>
              <th>Alumni ID</th>
              <th>Name</th>
              <th>Department</th>
              <th>Passout Year</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Gender</th>
              <th>Status</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="10">Loading...</td>
              </tr>
            ) : (
              alumni.map((alum) => (
                <tr key={alum.alumniid}>
                  <td>{alum.alumniid}</td>
                  <td>{alum.name}</td>
                  <td>{getDepartmentName(alum.deptid)}</td>
                  <td>{alum.year}</td>
                  <td>{alum.email}</td>
                  <td>{alum.contact}</td>
                  <td>{alum.gender}</td>
                  <td>{alum.status}</td>
                  <td>{alum.address}</td>
                  <td>
                    <button
                      onClick={() => setUpdateForm({ ...alum })}
                      title="Update Alumni"
                      className="icon-button"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => deleteAlumni(alum.alumniid)}
                      title="Delete Alumni"
                      className="icon-button"
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

      {/* Update Form */}
      {updateForm.alumniid && (
        <div className="update-form">
          <h2>Update Alumni</h2>
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
              name="name"
              placeholder="Name"
              value={updateForm.name}
              onChange={handleUpdateChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={updateForm.email}
              onChange={handleUpdateChange}
              required
            />
            <input
              type="text"
              name="contact"
              placeholder="Contact"
              value={updateForm.contact}
              onChange={handleUpdateChange}
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={updateForm.address}
              onChange={handleUpdateChange}
              required
            />
            <select
              name="gender"
              value={updateForm.gender}
              onChange={handleUpdateChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <input
              type="number"
              name="year"
              placeholder="Passout Year"
              value={updateForm.year}
              onChange={handleUpdateChange}
              required
            />
            <select
              name="status"
              value={updateForm.status}
              onChange={handleUpdateChange}
              required
            >
              <option value="">Select Status</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>

            <button type="submit">Update Alumni</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default ViewAlumni;
