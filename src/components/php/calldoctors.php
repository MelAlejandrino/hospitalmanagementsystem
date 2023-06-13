<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include 'connect.php';

$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case "GET":
        $sql = "SELECT * FROM doc_on_call";

        if (isset($_GET['doctor_number'])) {
            $doctor_number = $_GET['doctor_number'];
            $sql .= " WHERE doctor_number = ?";
            $stmt = mysqli_prepare($conn, $sql);
            mysqli_stmt_bind_param($stmt, "s", $doctor_number);
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
        $sql = "INSERT INTO DOC_ON_CALL(doctor_number, doctor_name, qualification, fees_per_call, payment_due, address, phone_number) VALUES (?, ?, ?, ?, ?, ?, ?)";
        $stmt = mysqli_prepare($conn, $sql);
        mysqli_stmt_bind_param($stmt, "sssssss", $doctor->doctor_number, $doctor->doctor_name, $doctor->qualification, $doctor->fees_per_call, $doctor->payment_due, $doctor->address, $doctor->phone_number);

        if (mysqli_stmt_execute($stmt)) {
            $response = ['status' => 1, 'message' => 'Record created successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Record creation failed.'];
        }
        echo json_encode($response);
        break;
    case "PUT":
        $doctor_number = $_REQUEST['doctor_number'];
        $formData = json_decode(file_get_contents('php://input'), true);
            $sql = "UPDATE DOC_ON_CALL SET doctor_number = ?, doctor_name = ?, qualification = ?, fees_per_call = ?, payment_due = ?, address = ?, phone_number = ? WHERE doctor_number = ?";
            $stmt = mysqli_prepare($conn, $sql);
            mysqli_stmt_bind_param($stmt, "ssssssss", $formData['doctor_number'], $formData['doctor_name'], $formData['qualification'], $formData['fees_per_call'], $formData['payment_due'], $formData['address'], $formData['phone_number'], $doctor_number);            

        if (mysqli_stmt_execute($stmt)) {
            $response = ['status' => 1, 'message' => 'Record updated successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Record update failed.'];
        }

        echo json_encode($response);
        break;

    case "DELETE":
        $sql = "DELETE FROM doc_on_call WHERE doctor_number = ? ";
        $doctor_number = $_GET['doctor_number'];
        $stmt = mysqli_prepare($conn, $sql);
        mysqli_stmt_bind_param($stmt, "s", $doctor_number);
        mysqli_stmt_execute($stmt);

        if (mysqli_stmt_execute($stmt)) {
            $response = ['status' => 1, 'message' => 'Record deleted successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Record delete failed.'];
        }
        break;
}
