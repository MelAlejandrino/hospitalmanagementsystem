import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <nav>
        <ul role="list" className="navbar">
          <li>
            <Link to="/">HOME</Link>
          </li>
          <li>
            <Link to="/Department">DEPARTMENTS</Link>
          </li>
          <li>
            <Link to="/Doctors">DOCTORS</Link>
          </li>
          <li>
            <Link to="/Patients">PATIENTS</Link>
          </li>
          <li>
            <Link to="/Rooms">ROOMS</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
