<?php
session_start(); // Start session
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Techbrew Cafe Event Booking</title>
    <link rel="stylesheet" href="event.css">
</head>
<body>
    <!-- Navbar -->
    <nav>
        <ul>
            <li><a href="home.php">Home</a></li>
            <li><a href="event.php">Events</a></li>
            <?php if (isset($_SESSION['loggedin']) && $_SESSION['loggedin']): ?>
                <li><a href="logout.php">Logout</a></li>
            <?php else: ?>
                <li><a href="login.php">Login</a></li>
            <?php endif; ?>
        </ul>
    </nav>

    <!-- Event Page -->
    <div class="event-page">
        <div class="overlay">
            <h1>Book Your Event</h1>

            <!-- Event Booking Form -->
            <form id="event-form" action="payment.php" method="POST" enctype="multipart/form-data">
                <input type="text" name="event_name" placeholder="Event Name" required><br>
                <input type="date" name="event_date" required><br>
                <input type="time" name="event_time" required><br>

                <!-- Decoration Preferences -->
                <textarea name="decoration_preference" placeholder="Decoration Preferences" required></textarea><br>

                <!-- File Upload for Event Decoration Picture -->
                <label for="decoration-image">Upload Decoration Image</label>
                <input type="file" name="decoration_image" id="decoration-image" accept="image/*"><br>
                <img id="preview-image" src="" alt="Decoration Preview" style="max-width: 100%; margin-top: 10px; display: none;"/><br>

                <button type="submit" class="btn">Book Event</button>
            </form>
        </div>
    </div>

    <script>
        // Handle image upload preview
        const decorationImageInput = document.getElementById('decoration-image');
        const previewImage = document.getElementById('preview-image');

        decorationImageInput.addEventListener('change', function (event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    previewImage.src = e.target.result;
                    previewImage.style.display = 'block';
                };
                reader.readAsDataURL(file);
            } else {
                previewImage.style.display = 'none';
            }
        });
    </script>
</body>
</html>
