<?php

session_start();


// Remove All Session Variables

session_unset();


// Destroy Session

session_destroy();


// Redirect Login Page

header("Location: login.php");

exit;

?>