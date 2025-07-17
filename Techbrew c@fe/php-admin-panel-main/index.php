<?php
session_start();
if (!isset($_SESSION['user_id'])) {
    header("Location: login.php");
    exit();
}
?>

<?php include './header.php'; ?>

<!-- Main Dashboard Boxes -->
<div class="row">
    <!-- New Orders -->
    <div class="col-lg-3 col-6">
        <div class="small-box bg-info">
            <div class="inner">
                <!--<h3>150</h3>-->
                <p>Order history</p>
            </div>
            <div class="icon">
                <i class="ion ion-bag"></i>
            </div>
            <a href="http://localhost/php-admin-panel-main/view_orders.php" class="small-box-footer">
                More info <i class="fas fa-arrow-circle-right"></i>
            </a>
        </div>
    </div>

    <!-- User Registrations -->
    <div class="col-lg-3 col-6">
        <div class="small-box bg-warning">
            <div class="inner">
                <!--<h3>44</h3>-->
                <p>Member Registrations</p>
            </div>
            <div class="icon">
                <i class="ion ion-person-add"></i>
            </div>
            <a href="http://localhost/php-admin-panel-main/register_member.php" class="small-box-footer">
                More info <i class="fas fa-arrow-circle-right"></i>
            </a>
        </div>
    </div>

    <!-- View Messages from Customers -->
    <div class="col-lg-3 col-6">
        <div class="small-box bg-info">
            <div class="inner">
                <!--<h3>150</h3>-->
                <p>View Messages From Customers</p>
            </div>
            <div class="icon">
                <i class="ion ion-email"></i>
            </div>
            <a href="http://localhost/php-admin-panel-main/view_messages.php" class="small-box-footer">
                More info <i class="fas fa-arrow-circle-right"></i>
            </a>
        </div>
    </div>
</div>

<?php include './footer.php'; ?>
