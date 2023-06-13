import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";

function Doctors() {
  return (
    <>
      <Typography variant="h1" color="initial" sx={{
        fontSize: "2rem",
        fontWeight: "400",
      }}>
        DOCTOR MANAGEMENT
      </Typography>
      <Link to="/ListDoctors">
        <Box className="dashboard-card">
          <AssignmentIndIcon className="card-images" />
          <Typography variant="body1" color="initial">
            ALL DOCTORS
          </Typography>
        </Box>
      </Link>

      <Link to="/ListRegDoctors">
        <Box className="dashboard-card">
          <AssignmentIndIcon className="card-images" />
          <Typography variant="body1" color="initial">
            ALL REGULAR DOCTORS
          </Typography>
        </Box>
      </Link>

      <Link to="/ListCallDoctors">
        <Box className="dashboard-card">
          <AssignmentIndIcon className="card-images" />
          <Typography variant="body1" color="initial">
            ALL ON-CALL DOCTORS
          </Typography>
        </Box>
      </Link>
      
    </>
  );
}

export default Doctors;
