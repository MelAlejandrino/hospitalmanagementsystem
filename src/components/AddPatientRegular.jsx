import React from "react";
import axios from "axios";
import { useState } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ImageContainer from "./ImageContainer";

function AddPatientRegular() {
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
        "http://localhost:3000/src/components/php/patientsregular.php",
        formData
      )
      .then(function (response) {
        console.log(response.data);
        navigate("/ListPatientsRegular");
      });
  };
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", }}>
        <Box sx={{ width: "100%" }}>
          <form onSubmit={handleSubmit} method="post">
            <label htmlFor="patient_number">Patient Number:</label>
            <input
              type="text"
              name="patient_number"
              placeholder="PT%%%"
              onChange={handleChange}
            />

            <label htmlFor="date_of_visit">Date of Visit:</label>
            <input type="date" name="date_of_visit" onChange={handleChange} />

            <label htmlFor="diagnosis">Diagnosis:</label>
            <input type="text" name="diagnosis" onChange={handleChange} />

            <label htmlFor="treatment">Treatment:</label>
            <input type="text" name="treatment" onChange={handleChange} />

            <label htmlFor="medicine_recommended">Medicine Recommended:</label>
            <input
              type="text"
              name="medicine_recommended"
              onChange={handleChange}
            />

            <label htmlFor="status_of_treatment">Status of Treatment:</label>
            <input
              type="text"
              name="status_of_treatment"
              onChange={handleChange}
            />

            <button type="submit" className="button-submit">
              ADD PATIENT REGULAR
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

export default AddPatientRegular;
