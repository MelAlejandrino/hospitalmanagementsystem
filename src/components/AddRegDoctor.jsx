import React from "react";
import axios from "axios";
import { useState } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ImageContainer from "./ImageContainer";

function AddRegDoctor() {
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
      .post("http://localhost:3000/src/components/php/regdoctors.php", formData)
      .then(function (response) {
        console.log(response.data);
        navigate("/ListRegDoctors");
      });
  };
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", }}>
        <Box sx={{ width: "100%" }}>
          <form onSubmit={handleSubmit} method="post">
            <label htmlFor="doctor_number">Doctor Number: </label>
            <input type="text" name="doctor_number" placeholder="DR%%%" onChange={handleChange} />

            <label htmlFor="doctor_name">Doctor Name: </label>
            <input type="text" name="doctor_name" onChange={handleChange} />

            <label htmlFor="qualification">Qualification:</label>
            <input type="text" name="qualification" onChange={handleChange} />

            <label htmlFor="address">Address:</label>
            <input type="text" name="address" onChange={handleChange} />

            <label htmlFor="phone_number">Phone Number:</label>
            <input type="text" name="phone_number" onChange={handleChange} />

            <label htmlFor="salary">Salary:</label>
            <input type="text" name="salary" onChange={handleChange} />

            <label htmlFor="date_of_joining">Date of Joining:</label>
            <input type="date" name="date_of_joining" onChange={handleChange} />

            <button type="submit" className="button-submit">
              ADD A REGULAR DOCTOR
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

export default AddRegDoctor;
