import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box } from "@mui/material";

function ListOccupiedRooms() {
  const [Rooms, setRooms] = useState([]);

  useEffect(() => {
    getRooms();
  }, []);

  function getRooms() {
    axios
      .get("http://localhost:3000/src/components/php/occupiedrooms.php")
      .then(function (response) {
        console.log(response.data);
        setRooms(response.data);
      });
  }

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
              </tr>
            ))}
            <tr></tr>
          </tbody>
        </table>
      </Box>
    </>
  );
}

export default ListOccupiedRooms;
