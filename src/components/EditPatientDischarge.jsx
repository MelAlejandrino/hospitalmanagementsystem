import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import ImageContainer from "./ImageContainer";

function EditPatientDischarge() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({});

  const { patient_number } = useParams();

  useEffect(() => {
    getPatient();
  }, [patient_number]);

  function getPatient() {
    axios
      .get(
        `http://localhost:3000/src/components/php/patientsdischarge.php?patient_number=${patient_number}`
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
        `http://localhost:3000/src/components/php/patientsdischarge.php?patient_number=${patient_number}`,
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
              value={formData.patient_number}
              name="patient_number"
              onChange={handleChange}
            />

            <label htmlFor="treatment_given">Treatment Given:</label>
            <input
              type="text"
              value={formData.treatment_given}
              name="treatment_given"
              onChange={handleChange}
            />

            <label htmlFor="treatment_advice">Treatment Advice:</label>
            <input
              type="text"
              value={formData.treatment_advice}
              name="treatment_advice"
              onChange={handleChange}
            />

            <label htmlFor="payment_made">Payment Made:</label>
            <input
              type="number"
              step="0.01"
              value={formData.payment_made}
              name="payment_made"
              onChange={handleChange}
            />

            <label htmlFor="mode_of_payment">Mode of Payment:</label>
            <input
              type="text"
              value={formData.mode_of_payment}
              name="mode_of_payment"
              onChange={handleChange}
            />

            <label htmlFor="date_discharged">Date Discharged:</label>
            <input
              type="date"
              value={formData.date_discharged}
              name="date_discharged"
              onChange={handleChange}
            />

            <button type="submit" className="button-submit">
              EDIT PATIENT DISCHARGE
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

export default EditPatientDischarge;
