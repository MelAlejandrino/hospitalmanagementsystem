import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import ImageContainer from "./ImageContainer";

function EditDepartment() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({});

  const { department_name } = useParams();

  useEffect(() => {
    getDepartment();
  }, [department_name]);

  function getDepartment() {
    axios
      .get(
        `http://localhost:3000/src/components/php/department.php?department_name=${department_name}`
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
        `http://localhost:3000/src/components/php/department.php?department_name=${department_name}`,
        formData
      )
      .then(function (response) {
        console.log(response.data);
        navigate("/Department");
      });
  };
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", }}>
        <Box sx={{ width: "100%" }}>
          <form onSubmit={handleSubmit} method="post">  
            <label htmlFor="department_name">Department Name: </label>
            <input
              value={formData.department_name}
              type="text"
              name="department_name"
              onChange={handleChange}
            />

            <label htmlFor="department_location">Department Location: </label>
            <input
              value={formData.department_location}
              type="text"
              name="department_location"
              onChange={handleChange}
            />

            <label htmlFor="facilities_available">
              Department Facilities Available:
            </label>
            <input
              value={formData.facilities_available}
              type="text"
              name="facilities_available"
              onChange={handleChange}
            />

            <button type="submit" className="button-submit">
              EDIT DEPARTMENT
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

export default EditDepartment;
