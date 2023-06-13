import { Box, Typography } from "@mui/material";
import React from "react";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import { Link } from "react-router-dom";

function Patients() {
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
        PATIENTS MANAGEMENT
      </Typography>

      <Link to="/ListPatientsEntry">
        <Box className="dashboard-card">
          <AssignmentIndIcon className="card-images" />
          <Typography variant="body1" color="initial">
            PATIENTS ENTRY
          </Typography>
        </Box>
      </Link>

      <Link to="/ListPatientsCheckup">
        <Box className="dashboard-card">
          <AssignmentIndIcon className="card-images" />
          <Typography variant="body1" color="initial">
            PATIENTS CHECKUP
          </Typography>
        </Box>
      </Link>

      <Link to="/ListPatientsAdmit">
        <Box className="dashboard-card">
          <AssignmentIndIcon className="card-images" />
          <Typography variant="body1" color="initial">
            PATIENTS ADMITTED
          </Typography>
        </Box>
      </Link>

      <Link to="/ListPatientsDischarge">
        <Box className="dashboard-card">
          <AssignmentIndIcon className="card-images" />
          <Typography variant="body1" color="initial">
            PATIENTS DISCHARGED
          </Typography>
        </Box>
      </Link>

      
      <Link to="/ListPatientsRegular">
        <Box className="dashboard-card">
          <AssignmentIndIcon className="card-images" />
          <Typography variant="body1" color="initial">
            PATIENTS REGULAR
          </Typography>
        </Box>
      </Link>

      <Link to="/ListPatientsOperation">
        <Box className="dashboard-card">
          <AssignmentIndIcon className="card-images" />
          <Typography variant="body1" color="initial">
            PATIENTS OPERATION
          </Typography>
        </Box>
      </Link>

    </>
  );
}

export default Patients;
