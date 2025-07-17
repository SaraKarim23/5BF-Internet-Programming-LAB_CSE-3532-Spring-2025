<?php
// Database connection
$servername = "localhost";
$username = "root";
$password = ""; // Set your MySQL password here
$dbname = "techbrew";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get form data
    $eventName = $_POST['event_name'];
    $eventDate = $_POST['event_date'];
    $eventTime = $_POST['event_time'];
    $decorationPreference = $_POST['decoration_preference'];
    $creditCard = $_POST['credit_card'];

    // Insert data into the events table
    $stmt = $conn->prepare("INSERT INTO  event (event_name, event_date, event_time, decoration_preference, payment_method) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sssss", $eventName, $eventDate, $eventTime, $decorationPreference, $creditCard);

    if ($stmt->execute()) {
        // Success message and redirection
        echo "<!DOCTYPE html>
        <html lang='en'>
        <head>
            <meta charset='UTF-8'>
            <meta name='viewport' content='width=device-width, initial-scale=1.0'>
            <title>Payment Successful</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    margin: 0;
                    background-color: #f9f9f9;
                    text-align: center;
                }
                .message-container {
                    background-color: #d4edda;
                    color: #155724;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                }
                .message-container h1 {
                    margin: 0;
                    font-size: 24px;
                }
                .message-container p {
                    margin: 10px 0;
                }
            </style>
            <script>
                setTimeout(() => {
                    window.location.href = 'home.php';
                }, 3000);
            </script>
        </head>
        <body>
            <div class='message-container'>
                <h1>Payment Successful!</h1>
                <p>Thank you for booking your event, $eventName!</p>
                <p>You will be redirected to the home page shortly...</p>
            </div>
        </body>
        </html>";
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
    $conn->close();
    exit;
} else {
    // Redirect to the event page if accessed directly
    header("Location: event.php");
    exit;
}
