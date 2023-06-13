import React from "react";
import Button from "@mui/material/Button";
import {
  Box,
  Container,
  IconButton,
  Input,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

function Login({ handleLogin }) {
  const [userInput, setUserInput] = useState("");
  const [passInput, setPassInput] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);

  const handleLoginClick = () => {
    if (userInput == "admin" && passInput == "admin") {
      handleLogin();
    } else{
      setIsInvalid(true);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleLoginClick();
  };

  return (
    <Box
      sx={{
        backgroundColor: "black",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        justifyContent: "center",
      }}
    >
      <Container
        sx={{
          backgroundColor: "white",
          display: "flex",
          width: "40%",
          padding: "2em",
          borderRadius: "0.5em",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="body1" sx={{ fontSize: "2rem" }}>
          HOSPITAL MANAGEMENT SYSTEM
        </Typography>
        <form onSubmit={handleFormSubmit}>
          <TextField
            fullWidth
            multiline
            label="User"
            id="user-input"
            onChange={(e) => setUserInput(e.target.value)}
            error={isInvalid}
            helperText={isInvalid && 'Invalid credentials'}
          />
          <TextField
            type="password"
            label="Password"
            id="pass-input"
            onChange={(e) => setPassInput(e.target.value)}
            error={isInvalid}
            helperText={isInvalid && 'Invalid credentials'}
          />
          <Button variant="contained" onClick={handleLoginClick} sx={{backgroundColor: 'black', "&:hover": {backgroundColor: "black" }}}>
            LOG IN
          </Button>
        </form>
      </Container>
    </Box>
  );
}

export default Login;
