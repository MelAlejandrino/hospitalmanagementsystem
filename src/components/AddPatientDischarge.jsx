import React from "react";
import axios from "axios";
import { useState } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ImageContainer from "./ImageContainer";

function AddPatientDischarge() {
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
        "http://localhost:3000/src/components/php/patientsdischarge.php",
        formData
      )
      .then(function (response) {
        console.log(response.data);
        navigate("/ListPatientsDischarge");
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

            <label htmlFor="treatment_given">Treatment Given:</label>
            <input type="text" name="treatment_given" onChange={handleChange} />

            <label htmlFor="treatment_advice">Treatment Advice:</label>
            <input
              type="text"
              name="treatment_advice"
              onChange={handleChange}
            />

            <label htmlFor="payment_made">Payment Made:</label>
            <input
              type="number"
              name="payment_made"
              step="0.01"
              onChange={handleChange}
            />

            <label htmlFor="mode_of_payment">Mode of Payment:</label>
            <input type="text" name="mode_of_payment" onChange={handleChange} />

            <label htmlFor="date_discharged">Date Discharged:</label>
            <input type="date" name="date_discharged" onChange={handleChange} />

            <button type="submit" className="button-submit">
              ADMIT THE PATIENT
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

export default AddPatientDischarge;
