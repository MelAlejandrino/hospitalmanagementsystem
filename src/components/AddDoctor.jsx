import React from "react";
import axios from "axios";
import { useState } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ImageContainer from "./ImageContainer";

function AddDoctor() {
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
      .post(
        "http://localhost:3000/src/components/php/doctors.php",
        formData
      )
      .then(function (response) {
        console.log(response.data);
        navigate('/Doctors');
      });
  };
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", }}>
        <Box sx={{ width: "100%" }}>
          <form onSubmit={handleSubmit} method="post">
            <label htmlFor="identity_number">Identity Number: </label>
            <input type="text" name="identity_number" placeholder="DR% OR DC%" onChange={handleChange} />

            <label htmlFor="doctor_name">Doctor Name: </label>
            <input
              type="text"
              name="doctor_name"
              onChange={handleChange}
              
            />

            <label htmlFor="department_name">
              Department Name:
            </label>
            <input
              type="text"
              name="department_name"
              onChange={handleChange}
            />

            <button type="submit" className="button-submit">
              ADD DOCTOR
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

export default AddDoctor;
