<?php
// Connection to the database
$conn = new mysqli('localhost', 'root', '', 'techbrew');

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Handle booking
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $event_date = $_POST['event_date'];
    $event_time = $_POST['event_time'];
    $event_name = $_POST['event_name'];
    $preferences = $_POST['preferences'];

    // Insert event into the events table
    $sql = "INSERT INTO events (event_date, event_time, event_name, status, created_by) 
            VALUES ('$event_date', '$event_time', '$event_name', 'booked', 1)"; // Assuming customer ID = 1

    if ($conn->query($sql) === TRUE) {
        $event_id = $conn->insert_id;
        echo '<script>alert("Event booked successfully!"); window.location.href = "events.php?event_id=' . $event_id . '";</script>';
    } else {
        echo 'Error: ' . $conn->error;
    }
}

// Check if event_id is set in the URL
$event_id = isset($_GET['event_id']) ? $_GET['event_id'] : 0;

if ($event_id > 0) {
    // Get event details for payment
    $sql = "SELECT * FROM events WHERE id = '$event_id'";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        $event = $result->fetch_assoc();
    } else {
        $event = null;
    }
} else {
    $event = null;
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Events - TechBrew Cafe</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg bg-black navbar-dark">
        <div class="container">
            <a class="navbar-brand fs-3 fw-bold fst-italic" href="#">𝒯𝑒𝒸𝒽𝒷𝓇𝑒𝓌 𝒞@𝒻𝑒'</a>
        </div>
    </nav>

    <div class="container mt-5">
        <h1>Book an Event</h1>
        
        <form method="POST" action="events.php">
            <div class="mb-3">
                <label for="eventName" class="form-label">Event Name</label>
                <input type="text" class="form-control" name="event_name" required>
            </div>
            <div class="mb-3">
                <label for="eventDate" class="form-label">Event Date</label>
                <input type="date" class="form-control" name="event_date" required>
            </div>
            <div class="mb-3">
                <label for="eventTime" class="form-label">Event Time</label>
                <input type="time" class="form-control" name="event_time" required>
            </div>
            <div class="mb-3">
                <label for="preferences" class="form-label">Preferences</label>
                <textarea class="form-control" name="preferences" rows="3"></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Book Event</button>
        </form>

        <?php if ($event): ?>
            <h2>Complete Your Payment</h2>
            <p>You have successfully booked the event: <?php echo $event['event_name']; ?> on <?php echo $event['event_date']; ?> at <?php echo $event['event_time']; ?>.</p>

            <!-- PayPal Payment -->
            <form action="https://www.sandbox.paypal.com/cgi-bin/webscr" method="post">
                <input type="hidden" name="cmd" value="_xclick">
                <input type="hidden" name="business" value="your-sandbox-email@example.com">
                <input type="hidden" name="item_name" value="Event Booking: <?php echo $event['event_name']; ?>">
                <input type="hidden" name="amount" value="50.00"> <!-- Example amount -->
                <input type="hidden" name="currency_code" value="USD">
                <input type="hidden" name="return" value="http://yourdomain.com/payment_success.php?event_id=<?php echo $event_id; ?>">
                <input type="hidden" name="cancel_return" value="http://yourdomain.com/payment_cancelled.php?event_id=<?php echo $event_id; ?>">
                <input type="hidden" name="notify_url" value="http://yourdomain.com/ipn_listener.php">

                <button type="submit" class="btn btn-success">Pay with PayPal</button>
            </form>
        <?php else: ?>
            <p>No event selected or event not found. Please <a href="events.php">book an event</a> first.</p>
        <?php endif; ?>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
