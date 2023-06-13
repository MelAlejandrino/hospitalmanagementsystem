<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include 'connect.php';

$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case "GET":
        $sql = "SELECT * FROM department";

        if (isset($_GET['department_name'])) {
            $departmentName = $_GET['department_name'];
            $sql .= " WHERE department_name = ?";
            $stmt = mysqli_prepare($conn, $sql);
            mysqli_stmt_bind_param($stmt, "s", $departmentName);
            mysqli_stmt_execute($stmt);
            $result = mysqli_stmt_get_result($stmt);
            $department = mysqli_fetch_assoc($result);
        } else {
            $result = mysqli_query($conn, $sql);
            $department = mysqli_fetch_all($result, MYSQLI_ASSOC);
        }

        echo json_encode($department);
        break;
    case "POST":
        $department = json_decode(file_get_contents('php://input'));
        $sql = "INSERT INTO department(department_name, department_location, facilities_available) VALUES (?, ?, ?)";
        $stmt = mysqli_prepare($conn, $sql);
        mysqli_stmt_bind_param($stmt, "sss", $department->department_name, $department->department_location, $department->facilities_available);
        if (mysqli_stmt_execute($stmt)) {
            $response = ['status' => 1, 'message' => 'Record created successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Record creation failed.'];
        }
        echo json_encode($response);
        break;
    case "PUT":
        $departmentName = $_REQUEST['department_name'];
        $formData = json_decode(file_get_contents('php://input'), true);

        $sql = "UPDATE department SET department_name = ?, department_location = ?, facilities_available = ? WHERE department_name = ?";
        $stmt = mysqli_prepare($conn, $sql);
        mysqli_stmt_bind_param($stmt, "ssss", $formData['department_name'], $formData['department_location'], $formData['facilities_available'], $departmentName);

        if (mysqli_stmt_execute($stmt)) {
            $response = ['status' => 1, 'message' => 'Record updated successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Record update failed.'];
        }

        echo json_encode($response);
        break;

    case "DELETE":
        $sql = "DELETE FROM department WHERE department_name = ? ";
        $departmentName = $_GET['department_name'];
        $stmt = mysqli_prepare($conn, $sql);
        mysqli_stmt_bind_param($stmt, "s", $departmentName);
        mysqli_stmt_execute($stmt);

        if (mysqli_stmt_execute($stmt)) {
            $response = ['status' => 1, 'message' => 'Record deleted successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Record delete failed.'];
        }
        break;
}
