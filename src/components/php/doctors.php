<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include 'connect.php';

$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case "GET":
        $sql = "SELECT * FROM all_doctors";

        if (isset($_GET['identity_number'])) {
            $identity_number = $_GET['identity_number'];
            $sql .= " WHERE identity_number = ?";
            $stmt = mysqli_prepare($conn, $sql);
            mysqli_stmt_bind_param($stmt, "s", $identity_number);
            mysqli_stmt_execute($stmt);
            $result = mysqli_stmt_get_result($stmt);
            $doctor = mysqli_fetch_assoc($result);
        } else {
            $result = mysqli_query($conn, $sql);
            $doctor = mysqli_fetch_all($result, MYSQLI_ASSOC);
        }

        echo json_encode($doctor);
        break;
    case "POST":
        $doctor = json_decode(file_get_contents('php://input'));
        $sql = "INSERT INTO all_doctors(identity_number, doctor_name, department_name) VALUES (?, ?, ?)";
        $stmt = mysqli_prepare($conn, $sql);
        mysqli_stmt_bind_param($stmt, "sss", $doctor->identity_number, $doctor->doctor_name, $doctor->department_name);
        if (mysqli_stmt_execute($stmt)) {
            $response = ['status' => 1, 'message' => 'Record created successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Record creation failed.'];
        }
        echo json_encode($response);
        break;
    case "PUT":
        $identity_number = $_REQUEST['identity_number'];
        $formData = json_decode(file_get_contents('php://input'), true);

        $sql = "UPDATE all_doctors SET identity_number = ?, doctor_name = ?, department_name = ? WHERE identity_number = ?";
        $stmt = mysqli_prepare($conn, $sql);
        mysqli_stmt_bind_param($stmt, "ssss", $formData['identity_number'], $formData['doctor_name'], $formData['department_name'], $identity_number);

        if (mysqli_stmt_execute($stmt)) {
            $response = ['status' => 1, 'message' => 'Record updated successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Record update failed.'];
        }

        echo json_encode($response);
        break;

    case "DELETE":
        $sql = "DELETE FROM all_doctors WHERE identity_number = ? ";
        $identity_number = $_GET['identity_number'];
        $stmt = mysqli_prepare($conn, $sql);
        mysqli_stmt_bind_param($stmt, "s", $identity_number);
        mysqli_stmt_execute($stmt);

        if (mysqli_stmt_execute($stmt)) {
            $response = ['status' => 1, 'message' => 'Record deleted successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Record delete failed.'];
        }
        break;
}

?>