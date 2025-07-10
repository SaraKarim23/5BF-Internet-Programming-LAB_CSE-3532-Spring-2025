<?php
// Connect to database
@include 'config.php';

// Check if the form was submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {

  // Get data from form
  $username = $_POST['username'];
  $email = $_POST['email'];
  $password = $_POST['password'];

  // Hash password for security
  $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

  // Insert data into 'users' table
  $sql = "INSERT INTO users (username, email, password) VALUES ('$username', '$email', '$hashedPassword')";

  if (mysqli_query($conn, $sql)) {
    echo "<script>alert('Signup successful!'); window.location.href='index.html';</script>";
  } else {
    echo "Error: " . mysqli_error($conn);
  }
}
?>
