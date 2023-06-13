<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include 'connect.php';

$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case "GET":
        $sql = "CALL admittedpatients()";

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
        $sql = "INSERT INTO PAT_ADMIT (patient_number, advance_payment, mode_of_payment, room_number, department_name, date_of_admission, initial_condition, diagnosis, treatment, doctor_number, attendant_name) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        $stmt = mysqli_prepare($conn, $sql);
        mysqli_stmt_bind_param($stmt, "sdsssssssss", $patient->patient_number, $patient->advance_payment, $patient->mode_of_payment, $patient->room_number, $patient->department_name, $patient->date_of_admission, $patient->initial_condition, $patient->diagnosis, $patient->treatment, $patient->doctor_number, $patient->attendant_name);

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

        $sql = "UPDATE PAT_ADMIT SET patient_number = ?, advance_payment = ?, mode_of_payment = ?, room_number = ?, department_name = ?, date_of_admission = ?, initial_condition = ?, diagnosis = ?, treatment = ?, doctor_number = ?, attendant_name = ? WHERE patient_number = ?";
        $stmt = mysqli_prepare($conn, $sql);
        mysqli_stmt_bind_param($stmt, "sdssssssssss", $formData['patient_number'], $formData['advance_payment'], $formData['mode_of_payment'], $formData['room_number'], $formData['department_name'], $formData['date_of_admission'], $formData['initial_condition'], $formData['diagnosis'], $formData['treatment'], $formData['doctor_number'], $formData['attendant_name'], $patient_number);


        if (mysqli_stmt_execute($stmt)) {
            $response = ['status' => 1, 'message' => 'Record updated successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Record update failed.'];
        }

        echo json_encode($response);
        break;

    case "DELETE":
        $sql = "DELETE FROM pat_admit WHERE patient_number = ? ";
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
