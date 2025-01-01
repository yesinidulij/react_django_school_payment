import React from 'react';
import '../styles/css/style.css';
import '../styles/lib/animate/animate.min.css';
import '../styles/lib/owlcarousel/assets/owl.carousel.min.css';
import '../styles/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import logo from '../styles/img/logo2.png'
import api from "../api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import { useState, useEffect } from "react";
function Navbar() {
 


  return (
    <div>
      <>
        <nav className="navbar navbar-expand-lg bg-white navbar-light sticky-top px-4 px-lg-5 py-lg-0 d-flex justify-content-between align-items-center">
          <a href="index.html" className="navbar-brand">
            <img src={logo} alt="" />
          </a>

          <div className="d-flex align-items-center">
            <button type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
              <span className="navbar-toggler-icon"></span>
            </button>
            <Link to="/login" className="btn btn-primary rounded-pill px-3 d-none d-lg-block">Login<i className="fa fa-arrow-right ms-3"></i></Link>
          </div>
        </nav>
      </>
    </div>
  );
}

export default Navbar;