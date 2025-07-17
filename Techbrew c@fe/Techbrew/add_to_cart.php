<?php
$conn = new mysqli("localhost", "root", "", "techbrew1");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$item_name = $_POST['item_name'] ?? '';
$quantity = $_POST['quantity'] ?? 1;
$email = $_POST['email'] ?? '';

$sql = "INSERT INTO orders (item_name, quantity, customer_email) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sis", $item_name, $quantity, $email);

if ($stmt->execute()) {
    echo "<script>alert('Added to cart successfully!'); window.location.href='menu.php';</script>";
} else {
    echo "Error: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
