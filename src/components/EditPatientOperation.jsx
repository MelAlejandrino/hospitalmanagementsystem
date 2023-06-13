import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import ImageContainer from "./ImageContainer";

function EditPatientOperation() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({});

  const { patient_number } = useParams();

  useEffect(() => {
    getPatient();
  }, [patient_number]);

  function getPatient() {
    axios
      .get(
        `http://localhost:3000/src/components/php/patientsoperation.php?patient_number=${patient_number}`
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
        `http://localhost:3000/src/components/php/patientsoperation.php?patient_number=${patient_number}`,
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
              value={formData.patient_number}
              name="patient_number"
              onChange={handleChange}
              placeholder="PT%%%"
            />

            <label htmlFor="date_of_admission">Date of Admission:</label>
            <input
              type="date"
              value={formData.date_of_admission}
              name="date_of_admission"
              onChange={handleChange}
            />

            <label htmlFor="date_of_operation">Date of Operation:</label>
            <input
              type="date"
              value={formData.date_of_operation}
              name="date_of_operation"
              onChange={handleChange}
            />

            <label htmlFor="doctor_number">Doctor Number:</label>
            <input
              type="text"
              value={formData.doctor_number}
              name="doctor_number"
              onChange={handleChange}
            />

            <label htmlFor="operation_theater_number">
              Operation Theater Number:
            </label>
            <input
              type="text"
              value={formData.operation_theater_number}
              name="operation_theater_number"
              onChange={handleChange}
            />

            <label htmlFor="type_of_operation">Type of Operation:</label>
            <input
              type="text"
              value={formData.type_of_operation}
              name="type_of_operation"
              onChange={handleChange}
            />

            <label htmlFor="condition_before_operation">
              Condition Before Operation:
            </label>
            <input
              type="text"
              value={formData.condition_before_operation}
              name="condition_before_operation"
              onChange={handleChange}
            />

            <label htmlFor="condition_after_operation">
              Condition After Operation:
            </label>
            <input
              type="text"
              value={formData.condition_after_operation}
              name="condition_after_operation"
              onChange={handleChange}
            />

            <label htmlFor="treatment_advice">Treatment Advice:</label>
            <input
              type="text"
              value={formData.treatment_advice}
              name="treatment_advice"
              onChange={handleChange}
            />

            <label htmlFor="department_name">Department Name:</label>
            <input
              type="text"
              value={formData.department_name}
              name="department_name"
              onChange={handleChange}
            />

            <button type="submit" className="button-submit">
              EDIT PATIENT OPERATION
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

export default EditPatientOperation;
