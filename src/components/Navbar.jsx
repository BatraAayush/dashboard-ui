import React from "react";
import { NavLink } from "react-router-dom";
import "../App.css"

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-dark px-4">
      <NavLink className="navbar-brand text-white" to="/">
        Dashboard
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav d-flex gap-4">
          <li>
            <NavLink
              className="nav-link text-white text-decoration-none"
              to="/graph-1"
            >
              Graph 1
            </NavLink>
          </li>
          <li>
            <NavLink
              className="nav-link text-white text-decoration-none"
              to="/graph-2"
            >
              Graph 2
            </NavLink>
          </li>
          <li>
            <NavLink
              className="nav-link text-white text-decoration-none"
              to="/graph-3"
            >
              Graph 3
            </NavLink>
          </li>
          <li>
            <NavLink
              className="nav-link text-white text-decoration-none"
              to="/graph-4"
            >
              Graph 4
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
