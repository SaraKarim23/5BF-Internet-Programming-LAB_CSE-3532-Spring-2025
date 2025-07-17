<?php
// submit_contact.php
$conn = new mysqli("localhost", "root", "", "techbrew");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$email = $_POST['email'] ?? '';
$message = $_POST['message'] ?? '';

$sql = "INSERT INTO contact_messages (email, message) VALUES (?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $email, $message);

if ($stmt->execute()) {
    echo "success";
} else {
    echo "error";
}

$stmt->close();
$conn->close();
?>
