<?php
session_start();
if (!isset($_SESSION['user_id'])) {
    header("Location: login.php");
    exit();
}

include './header.php';

// DB Connection
$conn = new mysqli("localhost", "root", "", "techbrew"); // Update DB name if needed
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch counts
$order_result = $conn->query("SELECT COUNT(*) as total_orders FROM orders");
$order_count = $order_result->fetch_assoc()['total_orders'];

$user_result = $conn->query("SELECT COUNT(*) as total_users FROM users"); // Or 'members'
$user_count = $user_result->fetch_assoc()['total_users'];

$msg_result = $conn->query("SELECT COUNT(*) as total_msgs FROM messages");
$msg_count = $msg_result->fetch_assoc()['total_msgs'];
?>

<!-- Main Dashboard Boxes -->
<div class="row">
    <!-- New Orders -->
    <div class="col-lg-3 col-6">
        <div class="small-box bg-info">
            <div class="inner">
                <h3><?php echo $order_count; ?></h3>
                <p>New Orders</p>
            </div>
            <div class="icon">
                <i class="ion ion-bag"></i>
            </div>
            <a href="view_orders.php" class="small-box-footer">
                More info <i class="fas fa-arrow-circle-right"></i>
            </a>
        </div>
    </div>

    <!-- User Registrations -->
    <div class="col-lg-3 col-6">
        <div class="small-box bg-warning">
            <div class="inner">
                <h3><?php echo $user_count; ?></h3>
                <p>User Registrations</p>
            </div>
            <div class="icon">
                <i class="ion ion-person-add"></i>
            </div>
            <a href="register_member.php" class="small-box-footer">
                More info <i class="fas fa-arrow-circle-right"></i>
            </a>
        </div>
    </div>

    <!-- Messages from Customers -->
    <div class="col-lg-3 col-6">
        <div class="small-box bg-info">
            <div class="inner">
                <h3><?php echo $msg_count; ?></h3>
                <p>Messages from Customers</p>
            </div>
            <div class="icon">
                <i class="ion ion-email"></i>
            </div>
            <a href="view_messages.php" class="small-box-footer">
                More info <i class="fas fa-arrow-circle-right"></i>
            </a>
        </div>
    </div>
</div>

<?php include './footer.php'; ?>
