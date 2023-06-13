import React from "react";
import axios from "axios";
import { useState } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ImageContainer from "./ImageContainer";

function AddPatientOperation() {
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
        "http://localhost:3000/src/components/php/patientsoperation.php",
        formData
      )
      .then(function (response) {
        console.log(response.data);
        navigate("/ListPatientsOperation");
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

            <label htmlFor="date_of_admission">Date of Admission:</label>
            <input
              type="date"
              name="date_of_admission"
              onChange={handleChange}
            />

            <label htmlFor="date_of_operation">Date of Operation:</label>
            <input
              type="date"
              name="date_of_operation"
              onChange={handleChange}
            />

            <label htmlFor="doctor_number">Doctor Number:</label>
            <input type="text" name="doctor_number" onChange={handleChange} />

            <label htmlFor="operation_theater_number">
              Operation Theater Number:
            </label>
            <input
              type="text"
              name="operation_theater_number"
              onChange={handleChange}
            />

            <label htmlFor="type_of_operation">Type of Operation:</label>
            <input
              type="text"
              name="type_of_operation"
              onChange={handleChange}
            />

            <label htmlFor="condition_before_operation">
              Condition Before Operation:
            </label>
            <input
              type="text"
              name="condition_before_operation"
              onChange={handleChange}
            />

            <label htmlFor="condition_after_operation">
              Condition After Operation:
            </label>
            <input
              type="text"
              name="condition_after_operation"
              onChange={handleChange}
            />

            <label htmlFor="treatment_advice">Treatment Advice:</label>
            <input
              type="text"
              name="treatment_advice"
              onChange={handleChange}
            />

            <label htmlFor="department_name">Department Name:</label>
            <input type="text" name="department_name" onChange={handleChange} />

            <button type="submit" className="button-submit">
              ADD PATIENT OPERATION
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

export default AddPatientOperation;
