<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include 'connect.php';

$sql = "SELECT * FROM department";

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

$xmlFilePath = 'department.xml';
$xmlDoc->save($xmlFilePath);
$conn->close();
// Read the XML file contents
$xmlContent = file_get_contents($xmlFilePath);
// Set the content type as XML
header('Content-type: text/xml');
// Output the XML contents
echo $xmlContent;
?>