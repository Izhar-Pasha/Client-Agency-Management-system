import React, { useState } from "react";
import "./Navbar.scss";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [theme, setTheme] = useState("dark");

  const handleClick = (e) => {
    e.preventDefault();
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <div className="navbar">
      <div className="theme">
        <button onClick={handleClick}>
          {theme === "dark" ? "Light" : "Dark"}
        </button>
      </div>
      <div className="navigate">
        <ul>
          <li>
            <Link to="/agencies">Agencies</Link>
            {/* Agencies */}
          </li>
          <li>
            <Link to="/clients">Clients</Link>
            {/* Clients */}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
