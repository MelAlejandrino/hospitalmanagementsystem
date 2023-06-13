import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ListDepartment from "./ListDepartment";

function Department() {

  return (
    <>
    <Box>
      <Typography variant="h1" color="initial" sx={{fontSize: '2rem', fontWeight: '400'}}>DEPARTMENTS MANAGEMENT</Typography>
      <ListDepartment />
      <Link to="/AddDepartment">
        <Button
          variant="contained"
          sx={{
            float: "right",
            backgroundColor: "black",
            "&:hover": { backgroundColor: "black" },
          }}
        >
          ADD DEPARTMENT
        </Button>
      </Link>
      </Box>
    </>
  );
}

export default Department;
