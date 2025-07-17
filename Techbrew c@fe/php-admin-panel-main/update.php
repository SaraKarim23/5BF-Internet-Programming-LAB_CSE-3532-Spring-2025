<?php
$conn = new mysqli("localhost", "root", "", "techbrew");
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$id = $_POST['id'];
$quantity = $_POST['quantity'];
$email = $_POST['email'];

$stmt = $conn->prepare("UPDATE orders SET quantity = ?, customer_email = ? WHERE id = ?");
$stmt->bind_param("isi", $quantity, $email, $id);

if ($stmt->execute()) {
    echo "Order updated successfully.";
} else {
    echo "Error updating order.";
}
$conn->close();
?>
