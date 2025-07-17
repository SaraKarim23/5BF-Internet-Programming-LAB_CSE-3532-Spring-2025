<?php
session_start();
include 'db.php'; // Include database connection

// Check if database connection is successful
if (!$conn) {
    die("Database connection failed: " . mysqli_connect_error());
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = $_POST['email']; // Get email from form
    $password = $_POST['password']; // Get password from form

    // Prepare and execute query
    $sql = "SELECT * FROM members WHERE email = ?";
    $stmt = $conn->prepare($sql);

    // Check if the prepared statement is successful
    if (!$stmt) {
        die("SQL error: " . $conn->error);
    }

    // Bind parameters and execute the statement
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        
        // Verify the password
        if (password_verify($password, $row['password'])) {
            $_SESSION['loggedin'] = true;
            $_SESSION['email'] = $row['email']; // Save email in session
            header('Location: home.php'); // Redirect to home page
            exit();
        } else {
            $error_message = "Invalid credentials! Incorrect password.";
        }
    } else {
        $error_message = "Invalid credentials! Email not found.";
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TechBrew Cafe - Login</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" rel="stylesheet">
    <style>
        /* TechBrew Cafe Theme */
        body {
            background: linear-gradient(135deg, #0f0f0f, #3c3c3c);
            color: #f2f2f2;
            font-family: 'Arial', sans-serif;
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0;
        }

        .login-container {
            background-color: #1c1c1c;
            padding: 40px;
            border-radius: 10px;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.7);
            animation: fadeIn 1s ease-in-out;
            max-width: 400px;
            width: 100%;
            text-align: center;
        }

        .login-container h2 {
            color: #ff6600;
            font-size: 2rem;
            margin-bottom: 20px;
            animation: slideDown 0.7s ease-out;
        }

        .form-control {
            background-color: #2b2b2b;
            color: #f2f2f2;
            border: 1px solid #444;
            border-radius: 5px;
            transition: 0.3s ease-in-out;
        }

        .form-control:focus {
            background-color: #333;
            border-color: #ff6600;
            box-shadow: 0 0 10px rgba(255, 102, 0, 0.8);
        }

        .btn-primary {
            background-color: #ff6600;
            border: none;
            color: #fff;
            padding: 10px 20px;
            font-size: 18px;
            border-radius: 5px;
            transition: background-color 0.3s ease-in-out;
            margin-top: 10px;
        }

        .btn-primary:hover {
            background-color: #ff4500;
        }

        .alert {
            animation: shake 0.7s ease-in-out;
        }

        a {
            color: #ff6600;
            text-decoration: none;
            transition: color 0.3s ease;
        }

        a:hover {
            color: #ff4500;
        }

        /* Animations */
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateY(-30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes shake {
            0%, 100% {
                transform: translateX(0);
            }
            25% {
                transform: translateX(-10px);
            }
            50% {
                transform: translateX(10px);
            }
            75% {
                transform: translateX(-10px);
            }
        }
    </style>
</head>
<body>
    <div class="login-container animate__animated animate__fadeIn">
        <h2>Login to TechBrew Cafe</h2>
        <?php if (isset($error_message)): ?>
            <div class="alert alert-danger"><?php echo $error_message; ?></div>
        <?php endif; ?>
        <form method="POST" action="login.php">
            <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" id="email" name="email" class="form-control" required>
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" id="password" name="password" class="form-control" required>
            </div>
            <button type="submit" class="btn btn-primary w-100">Login</button>
        </form>
        <p class="mt-4">Don't have an account? <a href="register.php">Register here</a></p>
        <p><a href="forget_password.php">Forgot your password?</a></p>
    </div>
</body>
</html>
