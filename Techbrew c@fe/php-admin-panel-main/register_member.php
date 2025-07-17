<?php
session_start();
if (!isset($_SESSION['user_id'])) {
    header("Location: login.php");
    exit();
}

// DB connection
$host = "localhost";
$user = "root";
$password = "";
$database = "techbrew";

$conn = new mysqli($host, $user, $password, $database);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch members
$members = [];
$result = $conn->query("SELECT id, name, age, email FROM members ORDER BY id DESC");
if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $members[] = $row;
    }
}
$conn->close();
?>

<!DOCTYPE html>
<html>
<head>
    <title>Registered Members - Admin Panel</title>
    <style>
        body {
            font-family: Arial, sans-serif;
        }
        .message {
            color: green;
            text-align: center;
            font-weight: bold;
            margin-top: 20px;
        }
        table {
            width: 90%;
            margin: 40px auto;
            border-collapse: collapse;
        }
        th, td {
            border: 1px solid #999;
            padding: 10px;
            text-align: center;
        }
        th {
            background-color: #eee;
        }
        h2 {
            text-align: center;
        }
        .button {
            padding: 6px 12px;
            text-decoration: none;
            border-radius: 4px;
            color: white;
            font-size: 14px;
        }
        .edit {
            background-color: #28a745;
        }
        .delete {
            background-color: #dc3545;
        }
        .top-bar {
            width: 90%;
            margin: 20px auto;
            text-align: right;
        }
        .top-bar a {
            padding: 10px 16px;
            background-color: #007BFF;
            color: white;
            text-decoration: none;
            border-radius: 4px;
        }
    </style>
</head>
<body>

<?php
// Display one-time success messages from session
if (isset($_SESSION['message'])) {
    echo '<p class="message">' . htmlspecialchars($_SESSION['message']) . '</p>';
    unset($_SESSION['message']);
}
?>

<div class="top-bar">
    <a href="registration.php">+ Register New Member</a>
</div>

<h2>Registered Members</h2>

<table>
    <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Age</th>
        <th>Email</th>
        <th>Edit</th>
        <th>Delete</th>
    </tr>
    <?php if (count($members) > 0): ?>
        <?php foreach ($members as $member): ?>
            <tr>
                <td><?= htmlspecialchars($member['id']) ?></td>
                <td><?= htmlspecialchars($member['name']) ?></td>
                <td><?= htmlspecialchars($member['age']) ?></td>
                <td><?= htmlspecialchars($member['email']) ?></td>
                <td>
                    <a href="edit.php?id=<?= urlencode($member['id']) ?>" class="button edit">Edit</a>
                </td>
                <td>
                    <a href="delete.php?id=<?= urlencode($member['id']) ?>"
                       class="button delete"
                       onclick="return confirm('Are you sure you want to delete this member?');">
                        Delete
                    </a>
                </td>
            </tr>
        <?php endforeach; ?>
    <?php else: ?>
        <tr>
            <td colspan="6">No members found.</td>
        </tr>
    <?php endif; ?>
</table>

</body>
</html>