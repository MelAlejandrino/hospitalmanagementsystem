<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include 'connect.php';

$sql = "SELECT d.department_name, o.identity_number, o.doctor_name, p.patient_number, p.patient_name
        FROM department d
        JOIN all_doctors o ON d.department_name = o.department_name
        JOIN pat_entry p ON p.department_name = d.department_name";

$result = $conn->query($sql);

// Create an XML document and loop through the fetched data to generate XML elements
$xmlDoc = new DOMDocument('1.0');
$xmlDoc->preserveWhiteSpace = false;
$xmlDoc->formatOutput = true;

$dataNode = $xmlDoc->createElement('data');
$xmlDoc->appendChild($dataNode);

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $recordNode = $xmlDoc->createElement('record');
        $dataNode->appendChild($recordNode);

        foreach ($row as $key => $value) {
            $fieldNode = $xmlDoc->createElement($key, $value);
            $recordNode->appendChild($fieldNode);
        }
    }
}

$conn->close();

// Set the content type as XML
header('Content-type: text/xml');
echo $xmlDoc->saveXML();
?>
