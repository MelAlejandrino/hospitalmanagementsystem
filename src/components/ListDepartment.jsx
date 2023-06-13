import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";

function ListDepartment() {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    getDepartments();
  }, []);

  function getDepartments() {
    axios
      .get("http://localhost:3000/src/components/php/department.php")
      .then(function (response) {
        console.log(response.data);
        setDepartments(response.data);
      });
  }

  const handleDelete = (department_name) => {
      axios.delete(`http://localhost:3000/src/components/php/department.php?department_name=${department_name}`).then(function(response){
        console.log(response.data);
        getDepartments();
      })
  }

  return (
    <>
      <Box>
        <table>
          <thead>
            <tr>
              <th>Department Name</th>
              <th>Department Location</th>
              <th>Facilities Available</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((department, key) => (
              <tr key={key}>
                <td>{department.department_name}</td>
                <td>{department.department_location}</td>
                <td>{department.facilities_available}</td>
                <td className="actionCol">
                  <Link to={`/EditDepartment/${department.department_name}`}>
                    Edit
                  </Link>
                  <button onClick={() => handleDelete(department.department_name)}>Delete</button>
                </td>
              </tr>
            ))}
            <tr></tr>
          </tbody>
        </table>
      </Box>
    </>
  );
}

export default ListDepartment;
