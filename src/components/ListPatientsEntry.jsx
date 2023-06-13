import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function ListPatientsEntry() {
  const [Patients, setPatients] = useState([]);

  useEffect(() => {
    getPatients();
  }, []);

  function getPatients() {
    axios
      .get("http://localhost:3000/src/components/php/patientsentry.php")
      .then(function (response) {
        console.log(response.data);
        setPatients(response.data);
      });
  }

  const handleDelete = (patient_number) => {
    axios
      .delete(
        `http://localhost:3000/src/components/php/patientsentry.php?patient_number=${patient_number}`
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
        PATIENTS ENTRY
      </Typography>
        <table>
          <thead>
            <tr>
              <th>Patient Number</th>
              <th>Patient Name</th>
              <th>Age</th>
              <th>Sex</th>
              <th>Address</th>
              <th>City</th>
              <th>Phone Number</th>
              <th>Entry Date</th>
              <th>Doctor Name</th>
              <th>Diagnosis</th>
              <th>Department Name</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {Patients.map((patient, key) => (
              <tr key={key}>
                <td>{patient.patient_number}</td>
                <td>{patient.patient_name}</td>
                <td>{patient.age}</td>
                <td>{patient.sex}</td>
                <td>{patient.address}</td>
                <td>{patient.city}</td>
                <td>{patient.phone_number}</td>
                <td>{patient.entry_date}</td>
                <td>{patient.doctor_name}</td>
                <td>{patient.diagnosis}</td>
                <td>{patient.department_name}</td>
                <td className="actionCol">
                  <Link to={`/EditPatientEntry/${patient.patient_number}`}>
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

        <Link to="/AddPatientEntry">
          <Button
            variant="contained"
            sx={{
              float: "right",
              backgroundColor: "black",
              "&:hover": { backgroundColor: "black" },
            }}
          >
            ADD A PATIENT ENTRY
          </Button>
        </Link>
      </Box>
    </>
  );
}

export default ListPatientsEntry;
