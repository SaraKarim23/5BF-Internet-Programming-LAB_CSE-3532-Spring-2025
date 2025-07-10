<?php
session_start();
if (!isset($_SESSION['username']) || $_SESSION['role'] !== 'user') {
    header("Location: index.html");
    exit;
}
echo "<h2>Welcome User: " . $_SESSION['username'] . "</h2>";
echo "<a href='logout.php'>Logout</a>";
?>
