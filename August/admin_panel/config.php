<?php

$conn = mysqli_connect(
    "localhost",
    "root",
    "",
    "ci_demo"
);

if (!$conn) {

    die("Database Connection Failed: " . mysqli_connect_error());

}

?>