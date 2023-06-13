<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include 'connect.php';

$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case "GET":
        $sql = "SELECT * FROM pat_entry";

        if (isset($_GET['patient_number'])) {
            $patient_number = $_GET['patient_number'];
            $sql .= " WHERE patient_number = ?";
            $stmt = mysqli_prepare($conn, $sql);
            mysqli_stmt_bind_param($stmt, "s", $patient_number);
            mysqli_stmt_execute($stmt);
            $result = mysqli_stmt_get_result($stmt);
            $patient = mysqli_fetch_assoc($result);
        } else {
            $result = mysqli_query($conn, $sql);
            $patient = mysqli_fetch_all($result, MYSQLI_ASSOC);
        }

        echo json_encode($patient);
        break;
    case "POST":
        $patient = json_decode(file_get_contents('php://input'));
        $sql = "INSERT INTO PAT_ENTRY (patient_number, patient_name, age, sex, address, city, phone_number, entry_date, doctor_name, diagnosis, department_name) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        $stmt = mysqli_prepare($conn, $sql);
        mysqli_stmt_bind_param($stmt, "ssissssssss", $patient->patient_number, $patient->patient_name, $patient->age, $patient->sex, $patient->address, $patient->city, $patient->phone_number, $patient->entry_date, $patient->doctor_name, $patient->diagnosis, $patient->department_name);
        if (mysqli_stmt_execute($stmt)) {
            $response = ['status' => 1, 'message' => 'Record created successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Record creation failed.'];
        }
        echo json_encode($response);
        break;
    case "PUT":
        $patient_number = $_REQUEST['patient_number'];
        $formData = json_decode(file_get_contents('php://input'), true);

        $sql = "UPDATE PAT_ENTRY SET patient_name = ?, age = ?, sex = ?, address = ?, city = ?, phone_number = ?, entry_date = ?, doctor_name = ?, diagnosis = ?, department_name = ? WHERE patient_number = ?";
        $stmt = mysqli_prepare($conn, $sql);
        mysqli_stmt_bind_param($stmt, "sisssssssss", $formData['patient_name'], $formData['age'], $formData['sex'], $formData['address'], $formData['city'], $formData['phone_number'], $formData['entry_date'], $formData['doctor_name'], $formData['diagnosis'], $formData['department_name'], $patient_number);

        if (mysqli_stmt_execute($stmt)) {
            $response = ['status' => 1, 'message' => 'Record updated successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Record update failed.'];
        }

        echo json_encode($response);
        break;

    case "DELETE":
        $sql = "DELETE FROM pat_entry WHERE patient_number = ? ";
        $patient_number = $_GET['patient_number'];
        $stmt = mysqli_prepare($conn, $sql);
        mysqli_stmt_bind_param($stmt, "s", $patient_number);
        mysqli_stmt_execute($stmt);

        if (mysqli_stmt_execute($stmt)) {
            $response = ['status' => 1, 'message' => 'Record deleted successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Record delete failed.'];
        }
}
