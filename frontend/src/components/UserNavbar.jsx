import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../styles/img/logo2.png';
import api from '../api';
function UserNavbar() {
  const [user, setUser] = useState({});

  const fetchUsers = async () => {
    const result = await api.get('api/current-user/');
    setUser(result.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <Fragment>
      <div>
        <nav className="navbar navbar-expand-lg bg-white navbar-light sticky-top px-4 px-lg-5 py-lg-0">
          <Link to="/" className="nav-item nav-link"><img src={logo} alt="" /></Link>
          <button
            type="button"
            className="navbar-toggler"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <div className="navbar-nav mx-auto">
              <Link to="/user" className="nav-item nav-link">Home</Link>
              <Link to="/payments" className="nav-item nav-link">Payments</Link>
              <Link to="/logout" className="nav-item nav-link">Logout</Link>

            </div>
            {/* Right-aligned user image and username */}
            <div className="ml-auto d-flex align-items-center">
              {user.image && ( // Check if user has an avatar before rendering
                <img
                src=""
                  alt="User Avatar"
                  className="user-avatar rounded-circle me-2"
                />
              )}
              {user.email && <span className="nav-item nav-link">{user.email} </span>}
            </div>
          </div>
        </nav>
      </div>
    </Fragment>
  );
}

export default UserNavbar;