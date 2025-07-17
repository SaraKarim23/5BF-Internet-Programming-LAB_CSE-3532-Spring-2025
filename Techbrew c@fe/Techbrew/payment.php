<?php
session_start(); // Start session
if (!isset($_SESSION['loggedin']) || !$_SESSION['loggedin']) {
    header("Location: login.php");
    exit;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Techbrew Cafe Payment</title>
    <link rel="stylesheet" href="event.css">
</head>
<body>
    <!-- Navbar -->
    <nav>
        <ul>
            <li><a href="home.php">Home</a></li>
            <li><a href="event.php">Events</a></li>
            <li><a href="logout.php">Logout</a></li>
        </ul>
    </nav>

    <!-- Payment Page -->
    <div class="event-page">
        <div class="overlay">
            <h1>Payment</h1>
            <form id="payment-form" action="payment_processing.php" method="POST">
                <input type="hidden" name="event_name" value="<?php echo htmlspecialchars($_POST['event_name']); ?>">
                <input type="hidden" name="event_date" value="<?php echo htmlspecialchars($_POST['event_date']); ?>">
                <input type="hidden" name="event_time" value="<?php echo htmlspecialchars($_POST['event_time']); ?>">
                <input type="hidden" name="decoration_preference" value="<?php echo htmlspecialchars($_POST['decoration_preference']); ?>">

                <label for="credit-card">Select Credit Card</label>
                <select id="credit-card" name="credit_card" required>
                    <option value="visa">Visa</option>
                    <option value="mastercard">Mastercard</option>
                    <option value="amex">American Express</option>
                </select><br>

                <button type="submit" class="btn">Submit Payment</button>
            </form>
        </div>
    </div>
</body>
</html>
