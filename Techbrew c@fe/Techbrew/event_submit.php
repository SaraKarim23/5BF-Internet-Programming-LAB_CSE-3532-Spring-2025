<?php
session_start();
include 'db.php';

// Check if user is logged in
if (!isset($_SESSION['user_id'])) {
    header("Location: login.php");
    exit;
}

$user_id = $_SESSION['user_id'];

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $event_name = $_POST['event_name'];
    $event_date = $_POST['event_date'];
    $event_time = $_POST['event_time'];
    $decoration_preference = $_POST['decoration_preference'];
    $decoration_image = '';

    // Handle file upload
    if (!empty($_FILES['decoration_image']['name'])) {
        $target_dir = "uploads/";
        $decoration_image = basename($_FILES['decoration_image']['name']);
        $target_file = $target_dir . $decoration_image;
        move_uploaded_file($_FILES['decoration_image']['tmp_name'], $target_file);
    }

    // Insert data into events table
    $sql = "INSERT INTO events (user_id, event_name, event_date, event_time, decoration_preference, decoration_image) 
            VALUES (?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("isssss", $user_id, $event_name, $event_date, $event_time, $decoration_preference, $decoration_image);

    if ($stmt->execute()) {
        header("Location: event.php");
        exit;
    } else {
        echo "Error: " . $stmt->error;
    }
}
?>
