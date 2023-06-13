<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include 'connect.php';

$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case "GET":
        $sql = "SELECT * FROM room_details";

        if (isset($_GET['room_number'])) {
            $room_number = $_GET['room_number'];
            $sql .= " WHERE room_number = ?";
            $stmt = mysqli_prepare($conn, $sql);
            mysqli_stmt_bind_param($stmt, "s", $room_number);
            mysqli_stmt_execute($stmt);
            $result = mysqli_stmt_get_result($stmt);
            $room = mysqli_fetch_assoc($result);
        } else {
            $result = mysqli_query($conn, $sql);
            $room = mysqli_fetch_all($result, MYSQLI_ASSOC);
        }

        echo json_encode($room);
        break;
    case "POST":
        $room = json_decode(file_get_contents('php://input'));
        $sql = "INSERT INTO ROOM_DETAILS (room_number, room_type, status, patient_number, patient_name, charges_per_day) VALUES (?, ?, ?, ?, ?, ?)";
        $stmt = mysqli_prepare($conn, $sql);
        mysqli_stmt_bind_param($stmt, "ssssss", $room->room_number, $room->room_type, $room->status, $room->patient_number, $room->patient_name, $room->charges_per_day);

        if (mysqli_stmt_execute($stmt)) {
            $response = ['status' => 1, 'message' => 'Record created successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Record creation failed.'];
        }
        echo json_encode($response);
        break;
    case "PUT":
        $room_number = $_REQUEST['room_number'];
        $formData = json_decode(file_get_contents('php://input'), true);

        $sql = "UPDATE ROOM_DETAILS SET room_number = ?, room_type = ?, status = ?, patient_number = ?, patient_name = ?, charges_per_day = ? WHERE room_number = ?";
        $stmt = mysqli_prepare($conn, $sql);
        mysqli_stmt_bind_param($stmt, "sssssss", $formData['room_number'], $formData['room_type'], $formData['status'], $formData['patient_number'], $formData['patient_name'], $formData['charges_per_day'], $room_number);


        if (mysqli_stmt_execute($stmt)) {
            $response = ['status' => 1, 'message' => 'Record updated successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Record update failed.'];
        }

        echo json_encode($response);
        break;

    case "DELETE":
        $sql = "DELETE FROM room_details WHERE room_number = ? ";
        $room_number = $_GET['room_number'];
        $stmt = mysqli_prepare($conn, $sql);
        mysqli_stmt_bind_param($stmt, "s", $room_number);
        mysqli_stmt_execute($stmt);

        if (mysqli_stmt_execute($stmt)) {
            $response = ['status' => 1, 'message' => 'Record deleted successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Record delete failed.'];
        }
}
