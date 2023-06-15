<?php
include 'connect.php';

// Read XML file contents
$xmlString = file_get_contents('department.xml');
$xml = simplexml_load_string($xmlString);

// Iterate over XML elements and insert into the database
foreach ($xml->department as $department) {
    $departmentName = (string) $department->department_name;
    $departmentLocation = (string) $department->department_location;
    $facilitiesAvailable = (string) $department->facilities_available;

    // Prepare and execute the insert statement
    $sql = "INSERT INTO department (department_name, department_location, facilities_available) VALUES (?, ?, ?)";
    $stmt = mysqli_prepare($conn, $sql);
    mysqli_stmt_bind_param($stmt, "sss", $departmentName, $departmentLocation, $facilitiesAvailable);
    mysqli_stmt_execute($stmt);
}

echo "XML data inserted into the database.";

mysqli_close($conn);
?>
