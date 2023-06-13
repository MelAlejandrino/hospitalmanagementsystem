import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function ListRegDoctors() {
  const [RegDoctors, setRegDoctors] = useState([]);

  useEffect(() => {
    getRegDoctors();
  }, []);

  function getRegDoctors() {
    axios
      .get("http://localhost:3000/src/components/php/regdoctors.php")
      .then(function (response) {
        console.log(response.data);
        setRegDoctors(response.data);
      });
  }

  const handleDelete = (doctor_number) => {
    axios
      .delete(
        `http://localhost:3000/src/components/php/regdoctors.php?doctor_number=${doctor_number}`
      )
      .then(function (response) {
        console.log(response.data);
        getRegDoctors();
      });
  };

  return (
    <>
      <Typography
        variant="h1"
        color="initial"
        sx={{
          fontSize: "2rem",
          fontWeight: "400",
        }}
      >
        REGULAR DOCTORS
      </Typography>
      <Box>
        <table>
          <thead>
            <tr>
              <th>Doctor Number</th>
              <th>Doctor Name</th>
              <th>Qualification</th>
              <th>Address</th>
              <th>Phone Number</th>
              <th>Salary</th>
              <th>Date of Joining</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {RegDoctors.map((doctor, key) => (
              <tr key={key}>
                <td>{doctor.doctor_number}</td>
                <td>{doctor.doctor_name}</td>
                <td>{doctor.qualification}</td>
                <td>{doctor.address}</td>
                <td>{doctor.phone_number}</td>
                <td>{doctor.salary}</td>
                <td>{doctor.date_of_joining}</td>
                <td className="actionCol">
                  <Link to={`/EditRegDoctor/${doctor.doctor_number}`}>
                    Edit
                  </Link>
                  <button onClick={() => handleDelete(doctor.doctor_number)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            <tr></tr>
          </tbody>
        </table>
        <Link to="/AddRegDoctor">
          <Button
            variant="contained"
            sx={{
              float: "right",
              backgroundColor: "black",
              "&:hover": { backgroundColor: "black" },
            }}
          >
            ADD A REGULAR DOCTOR
          </Button>
        </Link>
      </Box>
    </>
  );
}

export default ListRegDoctors;
