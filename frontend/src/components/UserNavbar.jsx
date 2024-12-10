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
        <Link to="/" className="nav-item nav-link"><img src={logo} alt="" />
        </Link>
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
            <Link to="/" className="nav-item nav-link">Home</Link>
              <Link to="/pay" className="nav-item nav-link">Pay</Link>
            </div>
            {/* Right-aligned username */}
            <div className="ml-auto">
              {user.username && (
                <span className="nav-item nav-link">{user.username}</span>
              )}
            </div>
          </div>
        </nav>
      </div>
    </Fragment>
  );
}

export default UserNavbar;