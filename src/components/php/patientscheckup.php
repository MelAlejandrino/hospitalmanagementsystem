<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include 'connect.php';

$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case "GET":
        $sql = "SELECT * FROM pat_chkup";

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
        $sql = "INSERT INTO PAT_CHKUP (patient_number, doctor_number, date_of_checkup, diagnosis, treatment, status) VALUES (?, ?, ?, ?, ?, ?)";
        $stmt = mysqli_prepare($conn, $sql);
        mysqli_stmt_bind_param($stmt, "ssssss", $patient->patient_number, $patient->doctor_number, $patient->date_of_checkup, $patient->diagnosis, $patient->treatment, $patient->status);

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
        $sql = "UPDATE PAT_CHKUP SET doctor_number = ?, date_of_checkup = ?, diagnosis = ?, treatment = ?, status = ? WHERE patient_number = ?";
        $stmt = mysqli_prepare($conn, $sql);
        mysqli_stmt_bind_param($stmt, "ssssss", $formData['doctor_number'], $formData['date_of_checkup'], $formData['diagnosis'], $formData['treatment'], $formData['status'], $patient_number);



        if (mysqli_stmt_execute($stmt)) {
            $response = ['status' => 1, 'message' => 'Record updated successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Record update failed.'];
        }

        echo json_encode($response);
        break;

    case "DELETE":
        $sql = "DELETE FROM pat_chkup WHERE patient_number = ? ";
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
