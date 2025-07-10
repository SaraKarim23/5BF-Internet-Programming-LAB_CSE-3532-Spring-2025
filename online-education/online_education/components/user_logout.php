<?php

   include 'connect.php';

   setcookie('user_id', '', time() - 1, '/');

   header('location:../online_home.php');

?>