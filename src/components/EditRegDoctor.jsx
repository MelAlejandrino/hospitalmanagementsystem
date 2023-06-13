import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import ImageContainer from "./ImageContainer";

function EditRegDoctor() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({});

  const { doctor_number } = useParams();

  useEffect(() => {
    getRegDoctor();
  }, [doctor_number]);

  function getRegDoctor() {
    axios
      .get(
        `http://localhost:3000/src/components/php/regdoctors.php?doctor_number=${doctor_number}`
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
        `http://localhost:3000/src/components/php/regdoctors.php?doctor_number=${doctor_number}`,
        formData
      )
      .then(function (response) {
        console.log(response.data);
        navigate("/ListRegDoctors");
      });
  };
  return (
    <>
      <Box sx={{  display: "flex", alignItems: "center", }}>
        <Box sx={{ width: "100%" }}>
          <form onSubmit={handleSubmit} method="post">
            <label htmlFor="doctor_number">Doctor Number: </label>
            <input type="text" value={formData.doctor_number} name="doctor_number" placeholder="DR ONLY" onChange={handleChange} />

            <label htmlFor="doctor_name">Doctor Name: </label>
            <input type="text" value={formData.doctor_name} name="doctor_name" onChange={handleChange} />

            <label htmlFor="qualification">Qualification:</label>
            <input type="text" value={formData.qualification} name="qualification" onChange={handleChange} />

            <label htmlFor="address">Address:</label>
            <input type="text" value={formData.address} name="address" onChange={handleChange} />

            <label htmlFor="phone_number">Phone Number:</label>
            <input type="text" value={formData.phone_number} name="phone_number" onChange={handleChange} />

            <label htmlFor="salary">Salary:</label>
            <input type="text" value={formData.salary} name="salary" onChange={handleChange} />

            <label htmlFor="date_of_joining">Date of Joining:</label>
            <input type="date" value={formData.date_of_joining} name="date_of_joining" onChange={handleChange} />

            <button type="submit" className="button-submit">
              EDIT REGULAR DOCTOR
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

export default EditRegDoctor;
