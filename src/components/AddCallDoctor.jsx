import React from "react";
import axios from "axios";
import { useState } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ImageContainer from "./ImageContainer";

function AddCallDoctor() {
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
        "http://localhost:3000/src/components/php/calldoctors.php",
        formData
      )
      .then(function (response) {
        console.log(response.data);
        navigate("/ListCallDoctors");
      });
  };
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", }}>
        <Box sx={{ width: "100%" }}>
          <form onSubmit={handleSubmit} method="post">
            <label htmlFor="doctor_number">Doctor Number:</label>
            <input type="text" name="doctor_number" placeholder="DC%%%" onChange={handleChange} />

            <label htmlFor="doctor_name">Doctor Name:</label>
            <input type="text" name="doctor_name" onChange={handleChange} />

            <label htmlFor="qualification">Qualification:</label>
            <input type="text" name="qualification" onChange={handleChange} />

            <label htmlFor="fees_per_call">Fees per Call:</label>
            <input type="text" name="fees_per_call" onChange={handleChange} />

            <label htmlFor="payment_due">Payment Due:</label>
            <input type="text" name="payment_due" onChange={handleChange} />

            <label htmlFor="address">Address:</label>
            <input type="text" name="address" onChange={handleChange} />

            <label htmlFor="phone_number">Phone Number:</label>
            <input type="text" name="phone_number" onChange={handleChange} />

            <button type="submit" className="button-submit">
              ADD ON-CALL DOCTOR
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

export default AddCallDoctor;
