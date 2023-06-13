import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function ListCallDoctors() {
  const [CallDoctors, setCallDoctors] = useState([]);

  useEffect(() => {
    getCallDoctors();
  }, []);

  function getCallDoctors() {
    axios
      .get("http://localhost:3000/src/components/php/calldoctors.php")
      .then(function (response) {
        console.log(response.data);
        setCallDoctors(response.data);
      });
  }

  const handleDelete = (doctor_number) => {
    axios
      .delete(
        `http://localhost:3000/src/components/php/calldoctors.php?doctor_number=${doctor_number}`
      )
      .then(function (response) {
        console.log(response.data);
        getCallDoctors();
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
        DOCTORS ON CALL
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
              <th>Fees per Call</th>
              <th>Payment Due</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {CallDoctors.map((doctor, key) => (
              <tr key={key}>
                <td>{doctor.doctor_number}</td>
                <td>{doctor.doctor_name}</td>
                <td>{doctor.qualification}</td>
                <td>{doctor.address}</td>
                <td>{doctor.phone_number}</td>
                <td>{doctor.fees_per_call}</td>
                <td>{doctor.payment_due}</td>
                <td className="actionCol">
                  <Link to={`/EditCallDoctor/${doctor.doctor_number}`}>
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

        <Link to="/AddCallDoctor">
          <Button
            variant="contained"
            sx={{
              float: "right",
              backgroundColor: "black",
              "&:hover": { backgroundColor: "black" },
            }}
          >
            ADD A DOCTOR ON CALL
          </Button>
        </Link>
      </Box>
    </>
  );
}

export default ListCallDoctors;
