<?php

setcookie('tutor_id', '', time() - 1, '/');
header('Location:../admin/login.php');

?>
