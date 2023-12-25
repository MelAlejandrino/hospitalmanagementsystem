import React from "react";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <div className="homepage">
        <Typography variant="h1" color="initial" sx={{fontSize: "3.5rem", fontWeight: "bold"}}>
          HOSPITAL MANAGEMENT SYSTEM
        </Typography>
        <div className="members">
          <h1>MEMBERS OF THIS SYSTEM:</h1>
          <ul role="list">
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
        <div className="links">
          <Link to="/ListOccupiedRooms">
            View Occupied Rooms
          </Link>
          <Link to="/ListVacantRooms">
            View Vacant Rooms
          </Link>
          <Link to="ListDataMart">
            DATA MART
          </Link>
          <Link to="ListAuditTable">
            AUDIT TABLE
          </Link>
        </div>
      </div>
    </>
  );
}

export default Home;
