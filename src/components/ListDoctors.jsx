import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function ListDoctors() {
  const [Doctors, setDoctors] = useState([]);

  useEffect(() => {
    getDoctors();
  }, []);

  function getDoctors() {
    axios
      .get("http://localhost:3000/src/components/php/doctors.php")
      .then(function (response) {
        console.log(response.data);
        setDoctors(response.data);
      });
  }

  const handleDelete = (identity_number) => {
    axios
      .delete(
        `http://localhost:3000/src/components/php/doctors.php?identity_number=${identity_number}`
      )
      .then(function (response) {
        console.log(response.data);
        getDoctors();
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
        ALL DOCTORS
      </Typography>
        <table>
          <thead>
            <tr>
              <th>Identity Number</th>
              <th>Doctor Name</th>
              <th>Department Name</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {Doctors.map((doctor, key) => (
              <tr key={key}>
                <td>{doctor.identity_number}</td>
                <td>{doctor.doctor_name}</td>
                <td>{doctor.department_name}</td>
                <td className="actionCol">
                  <Link to={`/EditDoctor/${doctor.identity_number}`}>Edit</Link>
                  <button onClick={() => handleDelete(doctor.identity_number)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            <tr></tr>
          </tbody>
        </table>
        <Link to="/AddDoctor">
          <Button
            variant="contained"
            sx={{
              float: "right",
              backgroundColor: "black",
              "&:hover": { backgroundColor: "black" },
            }}
          >
            ADD A DOCTOR
          </Button>
        </Link>
      </Box>
    </>
  );
}

export default ListDoctors;
