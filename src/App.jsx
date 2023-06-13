import React from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import { useState } from "react";
import { Box } from "@mui/material";

function App() {
  const [logged, setLogged] = useState(false);
  const handleLogin = () => {
    setLogged(true);
  };
  return (
    <div>
      {!logged && <Login handleLogin={handleLogin} />}
      {logged && (
        <Box
          sx={{
            backgroundColor: "black",
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            alignItems: 'center',
            padding: '1em'
          }}
        >
          <Dashboard />
        </Box>
      )}
    </div>
  );
}

export default App;
