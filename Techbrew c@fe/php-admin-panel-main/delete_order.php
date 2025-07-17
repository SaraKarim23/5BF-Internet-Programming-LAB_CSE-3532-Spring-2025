<?php
$conn = new mysqli("localhost", "root", "", "techbrew");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$id = $_POST['id'] ?? '';

if (!is_numeric($id)) {
    echo "Invalid ID!";
    exit;
}

$stmt = $conn->prepare("DELETE FROM orders WHERE id = ?");
$stmt->bind_param("i", $id);

if ($stmt->execute()) {
    echo "Order deleted successfully.";
} else {
    echo "Failed to delete order.";
}

$stmt->close();
$conn->close();
?>
