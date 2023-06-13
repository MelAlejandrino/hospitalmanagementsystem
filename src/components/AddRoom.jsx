import React from "react";
import axios from "axios";
import { useState } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ImageContainer from "./ImageContainer";

function AddRoom() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:3000/src/components/php/rooms.php", formData)
      .then(function (response) {
        console.log(response.data);
        navigate("/ListRooms");
      });
  };
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", }}>
        <Box sx={{ width: "100%" }}>
          <form onSubmit={handleSubmit} method="post">
            <label htmlFor="room_number">Room Number:</label>
            <input type="text" name="room_number" onChange={handleChange} />

            <label htmlFor="room_type">Room Type:</label>
            <input
              type="text"
              name="room_type"
              placeholder="[G/P]"
              maxLength={1}
              onChange={handleChange}
            />

            <label htmlFor="status">Status:</label>
            <input
              type="text"
              name="status"
              placeholder="[Y/N]"
              maxLength={1}
              onChange={handleChange}
            />

            <label htmlFor="patient_number">Patient Number:</label>
            <input type="text" name="patient_number" onChange={handleChange} />

            <label htmlFor="patient_name">Patient Name:</label>
            <input type="text" name="patient_name" onChange={handleChange} />

            <label htmlFor="charges_per_day">Charges per Day:</label>
            <input
              type="number"
              name="charges_per_day"
              step="0.01"
              onChange={handleChange}
            />

            <button type="submit" className="button-submit">
              ADD ROOM DETAILS
            </button>
          </form>
        </Box>
        <Box sx={{ width: "100%" }}>
            <ImageContainer />
        </Box>
      </Box>
    </>
  );
}

export default AddRoom;
