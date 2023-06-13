import React from "react";
import {
  Box,
  Container,
  Typography,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

import Navbar from "./Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Patients from "./Patients";
import Doctors from "./Doctors";
import Department from "./Department";
import AddDepartment from "./AddDepartment";
import EditDepartment from "./EditDepartment";
import AddDoctor from "./AddDoctor";
import EditDoctor from "./EditDoctor";
import ListDoctors from "./ListDoctors";
import ListRegDoctors from "./ListRegDoctors";
import EditRegDoctor from "./EditRegDoctor";
import AddRegDoctor from "./AddRegDoctor";
import ListCallDoctors from "./ListCallDoctors";
import EditCallDoctor from "./EditCallDoctor";
import AddCallDoctor from "./AddCallDoctor";
import AddPatientEntry from "./AddPatientEntry";
import ListPatientsEntry from "./ListPatientsEntry";
import EditPatientEntry from "./EditPatientEntry";
import ListPatientsCheckup from "./ListPatientsCheckup";
import AddPatientCheckup from "./AddPatientCheckup";
import EditPatientCheckup from "./EditPatientCheckup";
import AddPatientAdmit from "./AddPatientAdmit";
import ListPatientsAdmit from "./ListPatientsAdmit";
import EditPatientAdmit from "./EditPatientAdmit";
import ListPatientsDischarge from "./ListPatientsDischarge";
import AddPatientDischarge from "./AddPatientDischarge";
import EditPatientDischarge from "./EditPatientDischarge";
import ListPatientsRegular from "./ListPatientsRegular";
import AddPatientRegular from "./AddPatientRegular";
import EditPatientRegular from "./EditPatientRegular";
import ListPatientsOperation from "./ListPatientsOperation";
import AddPatientOperation from "./AddPatientOperation";
import EditPatientOperation from "./EditPatientOperation";
import ListRooms from "./ListRooms";
import AddRoom from "./AddRoom";
import EditRoom from "./EditRoom";
import Rooms from "./Rooms";
import ListOccupiedRooms from "./ListOccupiedRooms";
import ListVacantRooms from "./ListVacantRooms";
import ListDataMart from "./ListDataMart";
import ListAuditTable from "./ListAuditTable";

function Dashboard() {
  return (
    <div style={{ width: "100%" }}>
      <Box
        sx={{ backgroundColor: "white", width: "100%", borderRadius: "0.5em" }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: "1em",
            gap: "2em",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="body1"
              sx={{ color: "black", fontSize: "2rem" }}
            >
              ADMIN DASHBOARD
            </Typography>
            <Navbar />
          </Box>

          <Box sx={{}}>
            <Box className="dashboard-container">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Patients" element={<Patients />} />
                <Route path="/Doctors" element={<Doctors />} />
                <Route path="/Department" element={<Department />} />

                {/* ALL DOCTORS */}
                <Route path="/AddDoctor" element={<AddDoctor />} />
                <Route
                  path="/EditDoctor/:identity_number"
                  element={<EditDoctor />}
                />
                <Route path="/ListDoctors" element={<ListDoctors />} />

                {/* REGULAR DOCTORS */}
                <Route path="/ListRegDoctors" element={<ListRegDoctors />} />
                <Route path="/EditRegDoctor/:doctor_number" element={<EditRegDoctor />} />
                <Route path="/AddRegDoctor" element={<AddRegDoctor />} />

                {/* ON CALL DOCTORS */}
                <Route path="/ListCallDoctors" element={<ListCallDoctors />} />
                <Route path="/EditCallDoctor/:doctor_number" element={<EditCallDoctor />} />
                <Route path="/AddCallDoctor" element={<AddCallDoctor />} />

                {/* DEPARTMENT */}
                <Route path="/AddDepartment" element={<AddDepartment />} />
                <Route
                  path="/EditDepartment/:department_name"
                  element={<EditDepartment />}
                />

                {/* PATIENT ENTRY */}
                <Route path="/AddPatientEntry" element={<AddPatientEntry />} />
                <Route path="/ListPatientsEntry" element={<ListPatientsEntry />} />
                <Route path="/EditPatientEntry/:patient_number" element={<EditPatientEntry />} />

                {/* PATIENT CHECKUP */}
                <Route path="/ListPatientsCheckup" element={<ListPatientsCheckup />} />
                <Route path="/AddPatientCheckup" element={<AddPatientCheckup />} />
                <Route path="/EditPatientCheckup/:patient_number" element={<EditPatientCheckup />} />

                {/* PATIENTS ADMIT */}
                <Route path="/AddPatientAdmit" element={<AddPatientAdmit />} />
                <Route path="/ListPatientsAdmit" element={<ListPatientsAdmit />} />
                <Route path="/EditPatientAdmit/:patient_number" element={<EditPatientAdmit />} />

                {/* PATIENTS DISCHARGE */}
                <Route path="/ListPatientsDischarge" element={<ListPatientsDischarge />} />
                <Route path="/AddPatientDischarge" element={<AddPatientDischarge />} />
                <Route path="/EditPatientDischarge/:patient_number" element={<EditPatientDischarge />} />

                {/* PATIENTS REGULAR */}
                <Route path="/ListPatientsRegular" element={<ListPatientsRegular />} />
                <Route path="/AddPatientRegular" element={<AddPatientRegular />} />
                <Route path="/EditPatientRegular/:patient_number" element={<EditPatientRegular />} />

                {/* PATIENTS OPERATION */}
                <Route path="/ListPatientsOperation" element={<ListPatientsOperation />} />
                <Route path="/AddPatientOperation" element={<AddPatientOperation />} />
                <Route path="/EditPatientOperation/:patient_number" element={<EditPatientOperation />} />

                {/* ROOM DETAILS */}
                <Route path="/Rooms" element={<Rooms />} />
                <Route path="/ListRooms" element={<ListRooms />} />
                <Route path="/AddRoom" element={<AddRoom />} />
                <Route path="/EditRoom/:room_number" element={<EditRoom />} />

                {/* REQUIREMENTS */}
                <Route path="/ListOccupiedRooms" element={<ListOccupiedRooms />} />
                <Route path="/ListVacantRooms" element={<ListVacantRooms />} />
                <Route path="/ListDataMart" element={<ListDataMart />} />

                {/* Audit Table */}
                <Route path="/ListAuditTable" element={<ListAuditTable />} />

              </Routes>
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default Dashboard;
