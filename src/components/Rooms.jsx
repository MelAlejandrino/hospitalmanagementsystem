import { Typography } from "@mui/material";
import React from "react";
import ListRooms from "./ListRooms";

function Rooms() {
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
        ROOMS MANAGEMENT
      </Typography>
      <ListRooms />
    </>
  );
}

export default Rooms;
