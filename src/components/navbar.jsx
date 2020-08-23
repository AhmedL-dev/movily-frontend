import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = ({ user }) => {
  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light">
      <ul className="navbar-nav mr-auto">
        <NavLink className="navbar-brand mb-0 h1 nav-link" to="/">
          Movily
        </NavLink>
        <NavLink className="nav-item nav-link" to="/movies">
          Movies
        </NavLink>
        <NavLink className="nav-item nav-link" to="/customers">
          Customers
        </NavLink>
        <NavLink className="nav-item nav-link" to="/rentals">
          Rentals
        </NavLink>
        {user ? (
          <React.Fragment>
            <NavLink className="nav-item nav-link" to="/profile">
              {user.name}
            </NavLink>
            <NavLink className="nav-item nav-link" to="/logout">
              Logout
            </NavLink>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <NavLink className="nav-item nav-link" to="/login">
              Login
            </NavLink>
            <NavLink className="nav-item nav-link" to="/register">
              Register
            </NavLink>
          </React.Fragment>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
