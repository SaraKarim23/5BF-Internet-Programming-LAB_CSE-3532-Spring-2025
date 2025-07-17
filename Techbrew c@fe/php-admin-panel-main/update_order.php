<?php
$conn = new mysqli("localhost", "root", "", "techbrew");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$id = $_POST['id'] ?? '';
$quantity = $_POST['quantity'] ?? '';
$email = $_POST['email'] ?? '';

if (!is_numeric($id) || !is_numeric($quantity) || empty($email)) {
    echo "Invalid input!";
    exit;
}

$stmt = $conn->prepare("UPDATE orders SET quantity = ?, customer_email = ? WHERE id = ?");
$stmt->bind_param("isi", $quantity, $email, $id);

if ($stmt->execute()) {
    echo "Order updated successfully.";
} else {
    echo "Failed to update order.";
}

$stmt->close();
$conn->close();
?>
