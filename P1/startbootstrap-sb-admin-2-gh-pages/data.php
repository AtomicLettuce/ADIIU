<?php
// Establish a connection to the database
$host = 'localhost';
$user = 'root';
$password = '';
$database = 'ADIIU_P1_POKEMON';

$connection = new mysqli($host, $user, $password, $database);
if ($connection->connect_error) {
    die('Connection failed: ' . $connection->connect_error);
}

// Fetch data from the database
$query = 'SELECT * FROM pokedex';
$result = $connection->query($query);

// Convert the data to JSON
$data = [];
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

// Close the database connection
$connection->close();

// Set the response header to JSON
header('Content-Type: application/json');

// Output the data as JSON
echo json_encode($data);
?>