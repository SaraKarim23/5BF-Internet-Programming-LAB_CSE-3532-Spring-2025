<?php

$db_name = 'mysql:host=127.0.0.1;port=3307;dbname=course_db';
$user_name = 'root';
$user_password = '';

try {
   $conn = new PDO($db_name, $user_name, $user_password);
   $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
   echo "Database connected on port 3307!";
} catch(PDOException $e) {
   die("Connection failed: " . $e->getMessage());
}

function unique_id() {
   $str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
   $rand = array();
   $length = strlen($str) - 1;
   for ($i = 0; $i < 20; $i++) {
       $n = mt_rand(0, $length);
       $rand[] = $str[$n];
   }
   return implode($rand);
}
?>
