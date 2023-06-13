import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import ImageContainer from "./ImageContainer";

function EditPatientAdmit() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({});

  const { patient_number } = useParams();

  useEffect(() => {
    getPatient();
  }, [patient_number]);

  function getPatient() {
    axios
      .get(
        `http://localhost:3000/src/components/php/patientsadmit.php?patient_number=${patient_number}`
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
        `http://localhost:3000/src/components/php/patientsadmit.php?patient_number=${patient_number}`,
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
              value={formData.patient_number}
              name="patient_number"
              onChange={handleChange}
            />

            <label htmlFor="advance_payment">Advance Payment:</label>
            <input
              type="number"
              value={formData.advance_payment}
              name="advance_payment"
              onChange={handleChange}
            />

            <label htmlFor="mode_of_payment">Mode of Payment:</label>
            <input
              type="text"
              value={formData.mode_of_payment}
              name="mode_of_payment"
              onChange={handleChange}
            />

            <label htmlFor="room_number">Room Number:</label>
            <input
              type="text"
              value={formData.room_number}
              name="room_number"
              onChange={handleChange}
            />

            <label htmlFor="department_name">Department Name:</label>
            <input
              type="text"
              value={formData.department_name}
              name="department_name"
              onChange={handleChange}
            />

            <label htmlFor="date_of_admission">Date of Admission:</label>
            <input
              type="date"
              value={formData.date_of_admission}
              name="date_of_admission"
              onChange={handleChange}
            />

            <label htmlFor="initial_condition">Initial Condition:</label>
            <input
              type="text"
              value={formData.initial_condition}
              name="initial_condition"
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

            <label htmlFor="doctor_number">Doctor Number:</label>
            <input
              type="text"
              value={formData.doctor_number}
              name="doctor_number"
              onChange={handleChange}
            />

            <label htmlFor="attendant_name">Attendant Name:</label>
            <input
              type="text"
              value={formData.attendant_name}
              name="attendant_name"
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

export default EditPatientAdmit;
