<?php
session_start(); // Start the session

// Check if the user is logged in
$isLoggedIn = isset($_SESSION['loggedin']) && $_SESSION['loggedin'] == true;

// Return JSON response
header('Content-Type: application/json');
echo json_encode(['isLoggedIn' => $isLoggedIn]);
?>
