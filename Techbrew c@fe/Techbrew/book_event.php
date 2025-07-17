<?php
require_once 'db.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $event_date = $_POST['event_date'];
    $event_time = $_POST['event_time'];
    $event_name = $_POST['event_name'];
    $preferences = $_POST['preferences'];

    $sql = "INSERT INTO events (event_date, event_time, event_name, status) VALUES ('$event_date', '$event_time', '$event_name', 'booked')";

    if ($conn->query($sql) === TRUE) {
        echo '<script>alert("Event booked successfully!"); window.location.href = "event.php";</script>';
    } else {
        echo 'Error: ' . $conn->error;
    }
}
?>
