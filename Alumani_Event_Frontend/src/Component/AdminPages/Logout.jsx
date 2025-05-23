import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FiLogOut } from "react-icons/fi";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function Logout() {
  const navigate = useNavigate();
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);

  useEffect(() => {
    setCanGoBack(window.history.length > 1);
    setCanGoForward(true); 
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        Swal.fire("Logged out!", "You have been successfully logged out.", "success");
        navigate("/");
      }
    });
  };

  return (
    <>
      <div className="Wrapper position-fixed mb-3" style={{ width: "100%", zIndex: 1000 }}>
        <nav
          className="navbar navbar-expand-lg navbar-dark shadow sticky-top"
          style={{
            background: "linear-gradient(to bottom, #1c1c1c, #2e2e2e)",
            borderBottom: "1px solid #444",
          }}
        >
          <div className="container-fluid">
          
            <div className="d-flex align-items-center mx-3">
              <button
                className="btn btn-outline-light me-2"
                onClick={() => canGoBack && navigate(-1)}
                disabled={!canGoBack}
                title="Go Back"
              >
                <FaArrowLeft />
              </button>
              <button
                className="btn btn-outline-light"
                onClick={() => canGoForward && navigate(1)}
                disabled={!canGoForward}
                title="Go Forward"
              >
                <FaArrowRight />
              </button>
            </div>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNavDropdown">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <button
                    className="btn btn-danger fw-semibold d-flex align-items-center"
                    onClick={handleLogout}
                  >
                    <FiLogOut className="me-1" />
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
