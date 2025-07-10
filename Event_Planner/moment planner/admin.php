<?php
session_start();
if (!isset($_SESSION['username']) || $_SESSION['role'] !== 'admin') {
    header("Location: index.html");
    exit;
}
echo "<h2>Welcome Admin: " . $_SESSION['username'] . "</h2>";
echo "<a href='logout.php'>Logout</a>";
?>
