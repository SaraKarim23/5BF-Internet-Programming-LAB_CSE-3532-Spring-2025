<?php
session_start();
unset($_SESSION["current_user"]);
$rv=[];
echo json_encode($rv);
?>