<?php

include "config.php";

$message = "";




/* ================================
   INSERT USER
================================ */

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $first_name = trim($_POST['first_name']);
    $last_name  = trim($_POST['last_name']);
    $email      = trim($_POST['email']);
    $city       = trim($_POST['city']);
    $country    = trim($_POST['country']);


    // Insert Query

    $sql = "INSERT INTO users
            (first_name, last_name, email, city, country)
            VALUES (?, ?, ?, ?, ?)";


    $stmt = mysqli_prepare($conn, $sql);


    mysqli_stmt_bind_param(
        $stmt,
        "sssss",
        $first_name,
        $last_name,
        $email,
        $city,
        $country
    );


    if (mysqli_stmt_execute($stmt)) {

        header("Location: users.php?success=1");

        exit;

    } else {

        $message = "User not added!";

    }

}

?>


<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="UTF-8">

    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Add User</title>


    <!-- Bootstrap CSS -->

    <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
        rel="stylesheet"
    >


    <!-- Custom CSS -->

    <style>

        body {
            background-color: #f4f6f9;
        }


        .card {
            border-radius: 10px;
        }


        /* jQuery Validation Error */

        label.error {

            color: red;

            font-size: 14px;

            margin-top: 5px;

            display: block;

        }


        input.error {

            border: 1px solid red;

        }


        input.valid {

            border: 1px solid green;

        }

    </style>

</head>


<body>


<div class="container mt-5">


    <div class="row justify-content-center">


        <div class="col-md-8">


            <div class="card shadow">


                <!-- CARD HEADER -->

                <div class="card-header bg-primary text-white">

                    <h4 class="mb-0">

                        Add New User

                    </h4>

                </div>



                <!-- CARD BODY -->

                <div class="card-body p-4">


                    <!-- PHP ERROR MESSAGE -->

                    <?php if ($message != "") { ?>

                        <div class="alert alert-danger">

                            <?php echo $message; ?>

                        </div>

                    <?php } ?>



                    <!-- ================= FORM ================= -->

                    <form
                        id="userForm"
                        method="POST"
                        action=""
                    >


                        <div class="row">


                            <!-- First Name -->

                            <div class="col-md-6 mb-3">


                                <label class="form-label">

                                    First Name

                                </label>


                                <input
                                    type="text"
                                    name="first_name"
                                    id="first_name"
                                    class="form-control"
                                >


                            </div>



                            <!-- Last Name -->

                            <div class="col-md-6 mb-3">


                                <label class="form-label">

                                    Last Name

                                </label>


                                <input
                                    type="text"
                                    name="last_name"
                                    id="last_name"
                                    class="form-control"
                                >


                            </div>



                            <!-- Email -->

                            <div class="col-md-6 mb-3">


                                <label class="form-label">

                                    Email

                                </label>


                                <input
                                    type="text"
                                    name="email"
                                    id="email"
                                    class="form-control"
                                >


                            </div>



                            <!-- City -->

                            <div class="col-md-6 mb-3">


                                <label class="form-label">

                                    City

                                </label>


                                <input
                                    type="text"
                                    name="city"
                                    id="city"
                                    class="form-control"
                                >


                            </div>



                            <!-- Country -->

                            <div class="col-md-6 mb-3">


                                <label class="form-label">

                                    Country

                                </label>


                                <input
                                    type="text"
                                    name="country"
                                    id="country"
                                    class="form-control"
                                >


                            </div>


                        </div>



                        <!-- BUTTONS -->

                        <div class="mt-3">


                            <button
                                type="submit"
                                class="btn btn-success"
                            >

                                Save User

                            </button>



                            <a
                                href="users.php"
                                class="btn btn-secondary"
                            >

                                Back

                            </a>


                        </div>


                    </form>


                </div>


            </div>


        </div>


    </div>


</div>



<!-- =====================================
     jQuery
===================================== -->

<script
    src="https://code.jquery.com/jquery-3.6.0.min.js"
    integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="
    crossorigin="anonymous">
</script>



<!-- =====================================
     jQuery Validation Plugin
===================================== -->

<script
    src="https://cdn.jsdelivr.net/npm/jquery-validation@1.19.5/dist/jquery.validate.min.js">
</script>



<!-- =====================================
     jQuery Validation
===================================== -->

<script>

$(document).ready(function () {


    $("#userForm").validate({


        /* ================= RULES ================= */

        rules: {


            first_name: {

                required: true,

                minlength: 2

            },


            last_name: {

                required: true,

                minlength: 2

            },


            email: {

                required: true,

                email: true

            },


            city: {

                required: true,

                minlength: 2

            },


            country: {

                required: true,

                minlength: 2

            }

        },



        /* ================= MESSAGES ================= */

        messages: {


            first_name: {

                required: "Please enter first name",

                minlength: "First name must be at least 2 characters"

            },


            last_name: {

                required: "Please enter last name",

                minlength: "Last name must be at least 2 characters"

            },


            email: {

                required: "Please enter email address",

                email: "Please enter a valid email address"

            },


            city: {

                required: "Please enter city",

                minlength: "City must be at least 2 characters"

            },


            country: {

                required: "Please enter country",

                minlength: "Country must be at least 2 characters"

            }

        },


        /* ================= ERROR CLASS ================= */

        errorClass: "error",


        /* ================= VALID CLASS ================= */

        validClass: "valid"

    });


});

</script>



</body>

</html>