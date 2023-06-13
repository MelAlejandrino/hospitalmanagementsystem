import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box } from "@mui/material";

function ListAuditTable() {
  const [Audit, setAudit] = useState([]);

  useEffect(() => {
    getAudit();
  }, []);

  function getAudit() {
    axios
      .get("http://localhost:3000/src/components/php/audittable.php")
      .then(function (response) {
        console.log(response.data);
        setAudit(response.data);
      });
  }

  return (
    <>
      <Box>
        <table>
          <thead>
            <tr>
              <th>Patient Number</th>
              <th>Doctor Number</th>
              <th>Date Admitted</th>
              <th>Date Discharged</th>
            </tr>
          </thead>
          <tbody>
            {Audit.map((audit, key) => (
              <tr key={key}>
                <td>{audit.patient_number}</td>
                <td>{audit.doctor_number}</td>
                <td>{audit.date_admitted}</td>
                <td>{audit.date_discharged}</td>
              </tr>
            ))}
            <tr></tr>
          </tbody>
        </table>
      </Box>
    </>
  );
}

export default ListAuditTable;
