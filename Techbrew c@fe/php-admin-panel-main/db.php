<?php
$host = "localhost";
$user = "root";
$pass = "";
$dbname = "techbrew"; // change this to your actual database name

$conn = mysqli_connect($host, $user, $pass, $dbname);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
?>
