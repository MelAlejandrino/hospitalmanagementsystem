import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function ListPatientsRegular() {
  const [Patients, setPatients] = useState([]);

  useEffect(() => {
    getPatients();
  }, []);

  function getPatients() {
    axios
      .get("http://localhost:3000/src/components/php/patientsregular.php")
      .then(function (response) {
        console.log(response.data);
        setPatients(response.data);
      });
  }

  const handleDelete = (patient_number) => {
    axios
      .delete(
        `http://localhost:3000/src/components/php/patientsregular.php?patient_number=${patient_number}`
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
        PATIENTS REGULAR
      </Typography>
        <table>
          <thead>
            <tr>
              <th>Patient Number</th>
              <th>Date of Visit</th>
              <th>Diagnosis</th>
              <th>Treatment</th>
              <th>Medicine Recommended</th>
              <th>Status of Treatment</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {Patients.map((patient, key) => (
              <tr key={key}>
                <td>{patient.patient_number}</td>
                <td>{patient.date_of_visit}</td>
                <td>{patient.diagnosis}</td>
                <td>{patient.treatment}</td>
                <td>{patient.medicine_recommended}</td>
                <td>{patient.status_of_treatment}</td>
                <td className="actionCol">
                  <Link to={`/EditPatientRegular/${patient.patient_number}`}>
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

        <Link to="/AddPatientRegular">
          <Button
            variant="contained"
            sx={{
              float: "right",
              backgroundColor: "black",
              "&:hover": { backgroundColor: "black" },
            }}
          >
            ADD A PATIENT REGULAR
          </Button>
        </Link>
      </Box>
    </>
  );
}

export default ListPatientsRegular;
