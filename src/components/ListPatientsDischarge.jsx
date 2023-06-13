import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function ListPatientsDischarge() {
  const [Patients, setPatients] = useState([]);

  useEffect(() => {
    getPatients();
  }, []);

  function getPatients() {
    axios
      .get("http://localhost:3000/src/components/php/patientsdischarge.php")
      .then(function (response) {
        console.log(response.data);
        setPatients(response.data);
      });
  }

  const handleDelete = (patient_number) => {
    axios
      .delete(
        `http://localhost:3000/src/components/php/patientsdischarge.php?patient_number=${patient_number}`
      )
      .then(function (response) {
        console.log(response.data);
        getPatients();
      });
  };

  return (
    <>
      <Box>
      <Typography
        variant="h1"
        color="initial"
        sx={{
          fontSize: "2rem",
          fontWeight: "400",
        }}
      >
        PATIENTS DISCHARGED
      </Typography>
        <table>
          <thead>
            <tr>
              <th>Patient Number</th>
              <th>Treatment Given</th>
              <th>Treatment Advice</th>
              <th>Payment Made</th>
              <th>Mode of Payment</th>
              <th>Date Discharged</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {Patients.map((patient, key) => (
              <tr key={key}>
                <td>{patient.patient_number}</td>
                <td>{patient.treatment_given}</td>
                <td>{patient.treatment_advice}</td>
                <td>{patient.payment_made}</td>
                <td>{patient.mode_of_payment}</td>
                <td>{patient.date_discharged}</td>
                <td className="actionCol">
                  <Link to={`/EditPatientDischarge/${patient.patient_number}`}>
                    Edit
                  </Link>
                  <button onClick={() => handleDelete(patient.patient_number)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            <tr></tr>
          </tbody>
        </table>
        <Link to="/AddPatientDischarge">
          <Button
            variant="contained"
            sx={{
              float: "right",
              backgroundColor: "black",
              "&:hover": { backgroundColor: "black" },
            }}
          >
            DISCHARGE A PATIENT
          </Button>
        </Link>
      </Box>
    </>
  );
}

export default ListPatientsDischarge;
