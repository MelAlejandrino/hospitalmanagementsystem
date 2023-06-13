import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import ImageContainer from "./ImageContainer";

function EditDoctor() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({});

  const { identity_number } = useParams();

  useEffect(() => {
    getDoctor();
  }, [identity_number]);

  function getDoctor() {
    axios
      .get(
        `http://localhost:3000/src/components/php/doctors.php?identity_number=${identity_number}`
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
        `http://localhost:3000/src/components/php/doctors.php?identity_number=${identity_number}`,
        formData
      )
      .then(function (response) {
        console.log(response.data);
        navigate("/Doctors");
      });
  };
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", }}>
        <Box sx={{ width: "100%" }}>
          <form onSubmit={handleSubmit} method="post">  
            <label htmlFor="identity_number">Identity Number: </label>
            <input
              value={formData.identity_number}
              type="text"
              name="identity_number"
              onChange={handleChange}
              placeholder="DR% OR DC%"
            />

            <label htmlFor="doctor_name">Doctor Name: </label>
            <input
              value={formData.doctor_name}
              type="text"
              name="doctor_name"
              onChange={handleChange}
            />

            <label htmlFor="department_name">
              Department Name:
            </label>
            <input
              value={formData.department_name}
              type="text"
              name="department_name"
              onChange={handleChange}
            />

            <button type="submit" className="button-submit">
              EDIT DOCTOR
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

export default EditDoctor;
