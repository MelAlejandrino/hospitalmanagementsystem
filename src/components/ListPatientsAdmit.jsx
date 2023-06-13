import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function ListPatientsAdmit() {
  const [Patients, setPatients] = useState([]);

  useEffect(() => {
    getPatients();
  }, []);

  function getPatients() {
    axios
      .get("http://localhost:3000/src/components/php/patientsadmit.php")
      .then(function (response) {
        console.log(response.data);
        setPatients(response.data);
      });
  }

  const handleDelete = (patient_number) => {
    axios
      .delete(
        `http://localhost:3000/src/components/php/patientsadmit.php?patient_number=${patient_number}`
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
          PATIENTS ADMITTED
        </Typography>
        <table>
          <thead>
            <tr>
              <th>Patient Number</th>
              <th>Advance Payment</th>
              <th>Mode of Payment</th>
              <th>Room Number</th>
              <th>Department Name</th>
              <th>Date of Admission</th>
              <th>Initial Condition</th>
              <th>Diagnosis</th>
              <th>Treatment</th>
              <th>Doctor Number</th>
              <th>Attendant Name</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {Patients.map((patient, key) => (
              <tr key={key}>
                <td>{patient.patient_number}</td>
                <td>{patient.advance_payment}</td>
                <td>{patient.mode_of_payment}</td>
                <td>{patient.room_number}</td>
                <td>{patient.department_name}</td>
                <td>{patient.date_of_admission}</td>
                <td>{patient.initial_condition}</td>
                <td>{patient.diagnosis}</td>
                <td>{patient.treatment}</td>
                <td>{patient.doctor_number}</td>
                <td>{patient.attendant_name}</td>
                <td className="actionCol">
                  <Link to={`/EditPatientAdmit/${patient.patient_number}`}>
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

        <Link to="/AddPatientAdmit">
          <Button
            variant="contained"
            sx={{
              float: "right",
              backgroundColor: "black",
              "&:hover": { backgroundColor: "black" },
            }}
          >
            ADMIT A PATIENT
          </Button>
        </Link>
      </Box>
    </>
  );
}

export default ListPatientsAdmit;
