<?php
// Include database connection
include 'db.php';

// Initialize variables
$success_message = "";
$error_message = "";

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = $_POST['email'];

    // Check if the email exists in the database
    $sql = "SELECT * FROM members WHERE email = '$email'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // Notify admin to reset the password
        $admin_email = "admin@techbrewcafe.com"; // Replace with admin's email
        $subject = "Password Reset Request for TechBrew Cafe";
        $message = "Hello Admin,\n\nUser with email $email has requested a password reset. Please generate a new password and respond to the user directly.\n\nThanks,\nTechBrew Cafe";
        $headers = "From: no-reply@techbrewcafe.com"; // Replace with your domain's no-reply email

        if (mail($admin_email, $subject, $message, $headers)) {
            $success_message = "A password reset request has been sent to the admin. You will receive a response shortly.";
        } else {
            $error_message = "Failed to send the password reset request. Please try again later.";
        }
    } else {
        $error_message = "No account found with this email. Please check your email address.";
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TechBrew Cafe - Forgot Password</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  <style>
    body {
      background-color: black;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
      margin: 0;
    }

    .forgot-container {
      background-color: #333;
      padding: 30px;
      border-radius: 10px;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
      width: 100%;
      max-width: 400px;
      text-align: center;
    }

    .form-control {
      background-color: #444;
      border: none;
      color: white;
    }

    .form-control:focus {
      background-color: #555;
      border-color: #888;
      box-shadow: none;
    }

    .btn-primary {
      background-color: #ff6600;
      border: none;
      color: white;
      padding: 10px 20px;
      font-size: 18px;
      border-radius: 5px;
      transition: background-color 0.3s ease;
    }

    .btn-primary:hover {
      background-color: #ff4500;
    }

    a {
      color: #ff6600;
      text-decoration: none;
    }

    a:hover {
      text-decoration: underline;
    }

    .alert {
      animation: fadeIn 0.5s ease-in-out;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  </style>
</head>
<body>

  <div class="forgot-container">
    <h2>Forgot Password</h2>
    <p>Enter your registered email address to request a password reset.</p>

    <?php if ($success_message): ?>
      <div class="alert alert-success"><?php echo $success_message; ?></div>
    <?php endif; ?>

    <?php if ($error_message): ?>
      <div class="alert alert-danger"><?php echo $error_message; ?></div>
    <?php endif; ?>

    <form action="forget_password.php" method="POST">
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input type="email" class="form-control" name="email" id="email" required>
      </div>
      <button type="submit" class="btn btn-primary w-100">Submit</button>
    </form>

    <p class="mt-3"><a href="login.php">Back to Login</a></p>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
