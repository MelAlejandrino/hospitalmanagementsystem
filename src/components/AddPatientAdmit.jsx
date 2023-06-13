import React from "react";
import axios from "axios";
import { useState } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ImageContainer from "./ImageContainer";

function AddPatientAdmit() {
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
        "http://localhost:3000/src/components/php/patientsadmit.php",
        formData
      )
      .then(function (response) {
        console.log(response.data);
        navigate("/ListPatientsAdmit");
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

            <label htmlFor="advance_payment">Advance Payment:</label>
            <input
              type="number"
              name="advance_payment"
              step="0.01"
              onChange={handleChange}
            />

            <label htmlFor="mode_of_payment">Mode of Payment:</label>
            <input type="text" name="mode_of_payment" onChange={handleChange} />

            <label htmlFor="room_number">Room Number:</label>
            <input type="text" name="room_number" onChange={handleChange} />

            <label htmlFor="department_name">Department Name:</label>
            <input type="text" name="department_name" onChange={handleChange} />

            <label htmlFor="date_of_admission">Date of Admission:</label>
            <input
              type="date"
              name="date_of_admission"
              onChange={handleChange}
            />

            <label htmlFor="initial_condition">Initial Condition:</label>
            <input
              type="text"
              name="initial_condition"
              onChange={handleChange}
            />

            <label htmlFor="diagnosis">Diagnosis:</label>
            <input type="text" name="diagnosis" onChange={handleChange} />

            <label htmlFor="treatment">Treatment:</label>
            <input type="text" name="treatment" onChange={handleChange} />

            <label htmlFor="doctor_number">Doctor Number:</label>
            <input type="text" name="doctor_number" onChange={handleChange} />

            <label htmlFor="attendant_name">Attendant Name:</label>
            <input type="text" name="attendant_name" onChange={handleChange} />

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

export default AddPatientAdmit;
