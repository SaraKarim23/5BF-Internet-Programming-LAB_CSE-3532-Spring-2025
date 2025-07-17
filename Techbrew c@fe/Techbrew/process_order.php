<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "techbrew";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$customer_email = $_POST['customer_email'];
$cart_data = json_decode($_POST['cart_data'], true);

foreach ($cart_data as $item) {
    $name = $conn->real_escape_string($item['name']);
    $quantity = (int)$item['quantity'];

    $stmt = $conn->prepare("INSERT INTO orders (item_name, quantity, customer_email) VALUES (?, ?, ?)");
    $stmt->bind_param("sis", $name, $quantity, $customer_email);
    $stmt->execute();
}

$conn->close();
?>

<!DOCTYPE html>
<html>
<head>
  <title>Order Confirmation</title>
</head>
<body style="font-family: Arial; text-align: center; padding: 50px;">
  <h1>Thank You!</h1>
  <p>Your order has been placed successfully.</p>
  <p>Payment Method: <strong>Cash on Delivery</strong></p>
  <a href="menu.php">Back to Menu</a>
</body>
</html>
