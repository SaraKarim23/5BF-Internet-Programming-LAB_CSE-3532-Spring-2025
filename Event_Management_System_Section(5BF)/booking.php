<?php
include 'db.php';

$name = $_POST['name'];
$phone = $_POST['phone'];
$email = $_POST['email'];
$eventName = $_POST['eventName'];
$eventDate = $_POST['eventDate'];
$venue = $_POST['venue'];
$budget = $_POST['budget'];
$details = $_POST['details'];

$sql = "INSERT INTO bookings (name, phone, email, event_name, event_date, venue, budget, details)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssssssss", $name, $phone, $email, $eventName, $eventDate, $venue, $budget, $details);

if ($stmt->execute()) {
  echo "Booking received successfully!";
} else {
  echo "Error: " . $conn->error;
}
$conn->close();
?>
