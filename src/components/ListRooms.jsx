import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

function ListRooms() {
  const [Rooms, setRooms] = useState([]);

  useEffect(() => {
    getRooms();
  }, []);

  function getRooms() {
    axios
      .get("http://localhost:3000/src/components/php/rooms.php")
      .then(function (response) {
        console.log(response.data);
        setRooms(response.data);
      });
  }

  const handleDelete = (room_number) => {
    axios
      .delete(
        `http://localhost:3000/src/components/php/rooms.php?room_number=${room_number}`
      )
      .then(function (response) {
        console.log(response.data);
        getRooms();
      });
  };

  return (
    <>
      <Box>
        <table>
          <thead>
            <tr>
              <th>Room Number</th>
              <th>Room Type</th>
              <th>Status</th>
              <th>Patient Number</th>
              <th>Patient Name</th>
              <th>Charges per Day</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {Rooms.map((room, key) => (
              <tr key={key}>
                <td>{room.room_number}</td>
                <td>{room.room_type}</td>
                <td>{room.status}</td>
                <td>{room.patient_number}</td>
                <td>{room.patient_name}</td>
                <td>{room.charges_per_day}</td>
                <td className="actionCol">
                  <Link to={`/EditRoom/${room.room_number}`}>Edit</Link>
                  <button onClick={() => handleDelete(room.room_number)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            <tr></tr>
          </tbody>
        </table>

        <Link to="/AddRoom">
          <Button
            variant="contained"
            sx={{
              float: "right",
              backgroundColor: "black",
              "&:hover": { backgroundColor: "black" },
            }}
          >
            ADD A ROOM
          </Button>
        </Link>
      </Box>
    </>
  );
}

export default ListRooms;
