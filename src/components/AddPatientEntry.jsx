import React from "react";
import axios from "axios";
import { useState } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ImageContainer from "./ImageContainer";

function AddPatientEntry() {
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
        "http://localhost:3000/src/components/php/patientsentry.php",
        formData
      )
      .then(function (response) {
        console.log(response.data);
        navigate("/ListPatientsEntry");
      });
  };
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", }}>
        <Box sx={{ width: "100%" }}>
          <form onSubmit={handleSubmit} method="post">
            <label htmlFor="patient_number">Patient Number:</label>
            <input type="text" name="patient_number" placeholder="PT%%%" onChange={handleChange} />

            <label htmlFor="patient_name">Patient Name:</label>
            <input type="text" name="patient_name" onChange={handleChange} />

            <label htmlFor="age">Age:</label>
            <input type="number" name="age" onChange={handleChange} />

            <label htmlFor="sex">Sex:</label>
            <input type="text" name="sex" placeholder="M OR F ONLY" onChange={handleChange} />

            <label htmlFor="address">Address:</label>
            <input type="text" name="address" onChange={handleChange} />

            <label htmlFor="city">City:</label>
            <input type="text" name="city" onChange={handleChange} />

            <label htmlFor="phone_number">Phone Number:</label>
            <input type="text" name="phone_number" onChange={handleChange} />

            <label htmlFor="entry_date">Entry Date:</label>
            <input type="date" name="entry_date" onChange={handleChange} />

            <label htmlFor="doctor_name">Doctor Name:</label>
            <input type="text" name="doctor_name" onChange={handleChange} />

            <label htmlFor="diagnosis">Diagnosis:</label>
            <input type="text" name="diagnosis" onChange={handleChange} />

            <label htmlFor="department_name">Department Name:</label>
            <input type="text" name="department_name" onChange={handleChange} />

            <button type="submit" className="button-submit">
              ADD PATIENT ENTRY
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

export default AddPatientEntry;
