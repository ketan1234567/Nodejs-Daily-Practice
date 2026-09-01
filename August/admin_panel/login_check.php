<?php

session_start();

include "config.php";

$email = $_POST['email'];
$password = $_POST['password'];


$sql = "SELECT * FROM admins WHERE email = ?";

$stmt = mysqli_prepare($conn, $sql);

mysqli_stmt_bind_param($stmt, "s", $email);

mysqli_stmt_execute($stmt);

$result = mysqli_stmt_get_result($stmt);

$admin = mysqli_fetch_assoc($result);


if ($admin) {

    // Normal Password Check
    if ($password == $admin['password']) {

        $_SESSION['admin_id'] = $admin['id'];

        $_SESSION['admin_name'] = $admin['name'];

        $_SESSION['admin_email'] = $admin['email'];


        header("Location: dashboard.php");

        exit;

    } else {

        echo "Wrong Password";

    }

} else {

    echo "Admin Not Found";

}

?>