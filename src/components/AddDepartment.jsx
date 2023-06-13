import React from "react";
import axios from "axios";
import { useState } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ImageContainer from "./ImageContainer";

function AddDepartment() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post(
        "http://localhost:3000/src/components/php/department.php",
        formData
      )
      .then(function (response) {
        console.log(response.data);
        navigate('/');
      });
  };
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", }}>
        <Box sx={{ width: "100%" }}>
          <form onSubmit={handleSubmit} method="post">
            <label htmlFor="department_name">Department Name: </label>
            <input type="text" name="department_name" onChange={handleChange} />

            <label htmlFor="department_location">Department Location: </label>
            <input
              type="text"
              name="department_location"
              onChange={handleChange}
            />

            <label htmlFor="facilities_available">
              Department Facilities Available:{" "}
            </label>
            <input
              type="text"
              name="facilities_available"
              onChange={handleChange}
            />

            <button type="submit" className="button-submit">
              ADD DEPARTMENT
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

export default AddDepartment;
