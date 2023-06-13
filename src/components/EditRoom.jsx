import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import ImageContainer from "./ImageContainer";

function EditRoom() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({});

  const { room_number } = useParams();

  useEffect(() => {
    getRoom();
  }, [room_number]);

  function getRoom() {
    axios
      .get(
        `http://localhost:3000/src/components/php/rooms.php?room_number=${room_number}`
      )
      .then(function (response) {
        console.log(response.data);
        setFormData(response.data);
      });
  }

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .put(
        `http://localhost:3000/src/components/php/rooms.php?room_number=${room_number}`,
        formData
      )
      .then(function (response) {
        console.log(response.data);
        navigate("/ListRooms");
      });
  };
  return (
    <>
      <Box sx={{  display: "flex", alignItems: "center", }}>
        <Box sx={{ width: "100%" }}>
          <form onSubmit={handleSubmit} method="post">
            <label htmlFor="room_number">Room Number:</label>
            <input
              type="text"
              value={formData.room_number}
              name="room_number"
              onChange={handleChange}
            />

            <label htmlFor="room_type">Room Type:</label>
            <input
              type="text"
              value={formData.room_type}
              name="room_type"
              onChange={handleChange}
            />

            <label htmlFor="status">Status:</label>
            <input
              type="text"
              value={formData.status}
              name="status"
              onChange={handleChange}
            />

            <label htmlFor="patient_number">Patient Number:</label>
            <input
              type="text"
              value={formData.patient_number}
              name="patient_number"
              onChange={handleChange}
            />

            <label htmlFor="patient_name">Patient Name:</label>
            <input
              type="text"
              value={formData.patient_name}
              name="patient_name"
              onChange={handleChange}
            />

            <label htmlFor="charges_per_day">Charges per Day:</label>
            <input
              type="number"
              value={formData.charges_per_day}
              name="charges_per_day"
              step="0.01"
              onChange={handleChange}
            />

            <button type="submit" className="button-submit">
              EDIT ROOM DETAILS
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

export default EditRoom;
