import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import ImageContainer from "./ImageContainer";

function EditCallDoctor() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({});

  const { doctor_number } = useParams();

  useEffect(() => {
    getCallDoctor();
  }, [doctor_number]);

  function getCallDoctor() {
    axios
      .get(
        `http://localhost:3000/src/components/php/calldoctors.php?doctor_number=${doctor_number}`
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
        `http://localhost:3000/src/components/php/calldoctors.php?doctor_number=${doctor_number}`,
        formData
      )
      .then(function (response) {
        console.log(response.data);
        navigate("/ListCallDoctors");
      });
  };
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", }}>
        <Box sx={{ width: "100%" }}>
          <form onSubmit={handleSubmit} method="post">
            <label htmlFor="doctor_number">Doctor Number:</label>
            <input
              type="text"
              value={formData.doctor_number}
              name="doctor_number"
              onChange={handleChange}
              placeholder="DC ONLY"
            />

            <label htmlFor="doctor_name">Doctor Name:</label>
            <input
              type="text"
              value={formData.doctor_name}
              name="doctor_name"
              onChange={handleChange}
            />

            <label htmlFor="qualification">Qualification:</label>
            <input
              type="text"
              value={formData.qualification}
              name="qualification"
              onChange={handleChange}
            />

            <label htmlFor="fees_per_call">Fees per Call:</label>
            <input
              type="text"
              value={formData.fees_per_call}
              name="fees_per_call"
              onChange={handleChange}
            />

            <label htmlFor="payment_due">Payment Due:</label>
            <input
              type="text"
              value={formData.payment_due}
              name="payment_due"
              onChange={handleChange}
            />

            <label htmlFor="address">Address:</label>
            <input
              type="text"
              value={formData.address}
              name="address"
              onChange={handleChange}
            />

            <label htmlFor="phone_number">Phone Number:</label>
            <input
              type="text"
              value={formData.phone_number}
              name="phone_number"
              onChange={handleChange}
            />

            <button type="submit" className="button-submit">
              EDIT ON-CALL DOCTOR
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

export default EditCallDoctor;
