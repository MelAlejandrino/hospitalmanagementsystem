import React, { useEffect, useState } from "react";
import axios from "axios";

function ListDataMart() {
  const [xmlData, setXmlData] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("http://localhost:3000/src/components/php/datamart.php")
      .then(function (response) {
        setXmlData(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <div>
      <h2>DATA MART</h2>
      <pre>{xmlData}</pre>
    </div>
  );
}

export default ListDataMart;
