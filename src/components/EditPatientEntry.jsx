import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import ImageContainer from "./ImageContainer";

function EditPatientEntry() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({});

  const { patient_number } = useParams();

  useEffect(() => {
    getPatient();
  }, [patient_number]);

  function getPatient() {
    axios
      .get(
        `http://localhost:3000/src/components/php/patientsentry.php?patient_number=${patient_number}`
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
        `http://localhost:3000/src/components/php/patientsentry.php?patient_number=${patient_number}`,
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
            <input
              type="text"
              value={formData.patient_number}
              name="patient_number"
              onChange={handleChange}
              placeholder="PT%%%"
            />

            <label htmlFor="patient_name">Patient Name:</label>
            <input
              type="text"
              value={formData.patient_name}
              name="patient_name"
              onChange={handleChange}
            />

            <label htmlFor="age">Age:</label>
            <input
              type="number"
              value={formData.age}
              name="age"
              onChange={handleChange}
            />

            <label htmlFor="sex">Sex:</label>
            <input
              type="text"
              value={formData.sex}
              name="sex"
              onChange={handleChange}
            />

            <label htmlFor="address">Address:</label>
            <input
              type="text"
              value={formData.address}
              name="address"
              onChange={handleChange}
            />

            <label htmlFor="city">City:</label>
            <input
              type="text"
              value={formData.city}
              name="city"
              onChange={handleChange}
            />

            <label htmlFor="phone_number">Phone Number:</label>
            <input
              type="text"
              value={formData.phone_number}
              name="phone_number"
              onChange={handleChange}
            />

            <label htmlFor="entry_date">Entry Date:</label>
            <input
              type="date"
              value={formData.entry_date}
              name="entry_date"
              onChange={handleChange}
            />

            <label htmlFor="doctor_name">Doctor Name:</label>
            <input
              type="text"
              value={formData.doctor_name}
              name="doctor_name"
              onChange={handleChange}
            />

            <label htmlFor="diagnosis">Diagnosis:</label>
            <input
              type="text"
              value={formData.diagnosis}
              name="diagnosis"
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

export default EditPatientEntry;
