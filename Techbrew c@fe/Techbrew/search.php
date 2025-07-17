<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $query = htmlspecialchars($_POST['searchQuery']);
    echo "You searched for: $query";
}
?>
