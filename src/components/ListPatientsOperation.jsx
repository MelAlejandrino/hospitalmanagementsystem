import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function ListPatientsOperation() {
  const [Patients, setPatients] = useState([]);

  useEffect(() => {
    getPatients();
  }, []);

  function getPatients() {
    axios
      .get("http://localhost:3000/src/components/php/patientsoperation.php")
      .then(function (response) {
        console.log(response.data);
        setPatients(response.data);
      });
  }

  const handleDelete = (patient_number) => {
    axios
      .delete(
        `http://localhost:3000/src/components/php/patientsoperation.php?patient_number=${patient_number}`
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
        PATIENTS ON OPERATION
      </Typography>
        <table>
          <thead>
            <tr>
              <th>Patient Number</th>
              <th>Date of Admission</th>
              <th>Date of Operation</th>
              <th>Doctor Number</th>
              <th>Operation Theater Number</th>
              <th>Type of Operation</th>
              <th>Condition Before Operation</th>
              <th>Condition After Operation</th>
              <th>Treatment Advice</th>
              <th>Department Name</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {Patients.map((patient, key) => (
              <tr key={key}>
                <td>{patient.patient_number}</td>
                <td>{patient.date_of_admission}</td>
                <td>{patient.date_of_operation}</td>
                <td>{patient.doctor_number}</td>
                <td>{patient.operation_theater_number}</td>
                <td>{patient.type_of_operation}</td>
                <td>{patient.condition_before_operation}</td>
                <td>{patient.condition_after_operation}</td>
                <td>{patient.treatment_advice}</td>
                <td>{patient.department_name}</td>
                <td className="actionCol">
                  <Link to={`/EditPatientOperation/${patient.patient_number}`}>
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

        <Link to="/AddPatientOperation">
          <Button
            variant="contained"
            sx={{
              float: "right",
              backgroundColor: "black",
              "&:hover": { backgroundColor: "black" },
            }}
          >
            ADD A PATIENT OPERATION
          </Button>
        </Link>
      </Box>
    </>
  );
}

export default ListPatientsOperation;
