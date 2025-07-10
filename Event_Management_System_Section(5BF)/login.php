<?php
$conn = new mysqli('localhost', 'root', '', 'user_db');
$message = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $email = $_POST['email'];
  $password = $_POST['password'];

  $sql = "SELECT * FROM users WHERE email='$email'";
  $result = $conn->query($sql);

  if ($result->num_rows == 1) {
    $row = $result->fetch_assoc();

    if (password_verify($password, $row['password'])) {
      $message = "✅ Login successful! Welcome, " . $row['name'];
      // Optional: session_start(); $_SESSION['user'] = $row['name'];
      // header("Location: dashboard.php");
    } else {
      $message = "❌ Incorrect password!";
    }
  } else {
    $message = "❌ No account found with this email!";
  }

  $conn->close();
}
?>
