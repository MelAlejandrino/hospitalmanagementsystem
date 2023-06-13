import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import ImageContainer from "./ImageContainer";

function EditPatientCheckup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({});

  const { patient_number } = useParams();

  useEffect(() => {
    getPatient();
  }, [patient_number]);

  function getPatient() {
    axios
      .get(
        `http://localhost:3000/src/components/php/patientscheckup.php?patient_number=${patient_number}`
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
        `http://localhost:3000/src/components/php/patientscheckup.php?patient_number=${patient_number}`,
        formData
      )
      .then(function (response) {
        console.log(response.data);
        navigate("/ListPatientsCheckup");
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
            />

            <label htmlFor="doctor_number">Doctor Number:</label>
            <input
              type="text"
              value={formData.doctor_number}
              name="doctor_number"
              onChange={handleChange}
            />

            <label htmlFor="date_of_checkup">Date of Checkup:</label>
            <input
              type="date"
              value={formData.date_of_checkup}
              name="date_of_checkup"
              onChange={handleChange}
            />

            <label htmlFor="diagnosis">Diagnosis:</label>
            <input
              type="text"
              value={formData.diagnosis}
              name="diagnosis"
              onChange={handleChange}
            />

            <label htmlFor="treatment">Treatment:</label>
            <input
              type="text"
              value={formData.treatment}
              name="treatment"
              onChange={handleChange}
            />

            <label htmlFor="status">Status:</label>
            <input
              type="text"
              value={formData.status}
              name="status"
              onChange={handleChange}
            />

            <button type="submit" className="button-submit">
              EDIT PATIENT
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

export default EditPatientCheckup;
