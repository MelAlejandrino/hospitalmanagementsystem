<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include 'connect.php';

$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case "GET":
        $sql = "SELECT * FROM pat_opr";

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
        $sql = "INSERT INTO PAT_OPR (patient_number, date_of_admission, date_of_operation, doctor_number, operation_theater_number, type_of_operation, condition_before_operation, condition_after_operation, treatment_advice, department_name) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        $stmt = mysqli_prepare($conn, $sql);
        mysqli_stmt_bind_param($stmt, "ssssssssss", $patient->patient_number, $patient->date_of_admission, $patient->date_of_operation, $patient->doctor_number, $patient->operation_theater_number, $patient->type_of_operation, $patient->condition_before_operation, $patient->condition_after_operation, $patient->treatment_advice, $patient->department_name);

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

        $sql = "UPDATE PAT_OPR SET date_of_admission = ?, date_of_operation = ?, doctor_number = ?, operation_theater_number = ?, type_of_operation = ?, condition_before_operation = ?, condition_after_operation = ?, treatment_advice = ?, department_name = ? WHERE patient_number = ?";
        $stmt = mysqli_prepare($conn, $sql);
        mysqli_stmt_bind_param($stmt, "ssssssssss", $formData['date_of_admission'], $formData['date_of_operation'], $formData['doctor_number'], $formData['operation_theater_number'], $formData['type_of_operation'], $formData['condition_before_operation'], $formData['condition_after_operation'], $formData['treatment_advice'], $formData['department_name'], $patient_number);


        if (mysqli_stmt_execute($stmt)) {
            $response = ['status' => 1, 'message' => 'Record updated successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Record update failed.'];
        }

        echo json_encode($response);
        break;

    case "DELETE":
        $sql = "DELETE FROM pat_opr WHERE patient_number = ? ";
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
