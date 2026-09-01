<?php

session_start();

// Check Admin Login
if (!isset($_SESSION['admin_id'])) {

    header("Location: login.php");
    exit;
}

?>

<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="UTF-8">

    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Admin Dashboard</title>


    <!-- Bootstrap CSS -->

    <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
        rel="stylesheet"
    >


    <!-- Bootstrap Icons -->

    <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
    >


    <style>

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }


        body {

            background-color: #f4f6f9;

            overflow-x: hidden;

        }


        /* ================= NAVBAR ================= */

        .top-navbar {

            height: 65px;

            position: fixed;

            top: 0;

            left: 0;

            width: 100%;

            z-index: 1000;

        }


        /* ================= SIDEBAR ================= */

        .sidebar {

            position: fixed;

            top: 65px;

            left: 0;

            width: 250px;

            height: calc(100vh - 65px);

            background: #212529;

            padding-top: 20px;

            overflow-y: auto;

            z-index: 999;

        }


        .sidebar a {

            display: block;

            color: white;

            text-decoration: none;

            padding: 15px 25px;

            transition: 0.3s;

        }


        .sidebar a:hover {

            background: #343a40;

            color: white;

        }


        .sidebar .active {

            background: #0d6efd;

        }


        /* ================= MAIN CONTENT ================= */

        .main-content {

            margin-left: 250px;

            margin-top: 65px;

            padding: 30px;

            min-height: calc(100vh - 65px);

        }


        /* ================= DASHBOARD CARDS ================= */

        .dashboard-card {

            border: none;

            border-radius: 10px;

            box-shadow: 0 2px 10px rgba(0,0,0,0.08);

        }


        /* ================= FOOTER ================= */

        .footer {

            margin-left: 250px;

            background: white;

            padding: 15px;

            text-align: center;

            border-top: 1px solid #ddd;

        }


        /* ================= MOBILE ================= */

        @media (max-width: 768px) {


            .sidebar {

                width: 200px;

            }


            .main-content {

                margin-left: 200px;

            }


            .footer {

                margin-left: 200px;

            }

        }

    </style>

</head>


<body>


<!-- ================= NAVBAR ================= -->

<nav class="navbar navbar-expand-lg navbar-dark bg-dark top-navbar">

    <div class="container-fluid">


        <a
            class="navbar-brand ms-3"
            href="dashboard.php"
        >

            <i class="bi bi-speedometer2"></i>

            Admin Panel

        </a>


        <div class="d-flex align-items-center">


            <span class="text-white me-3">

                Welcome,
                <?php echo $_SESSION['admin_name']; ?>

            </span>


            <a
                href="logout.php"
                class="btn btn-danger btn-sm me-3"
            >

                <i class="bi bi-box-arrow-right"></i>

                Logout

            </a>


        </div>


    </div>

</nav>



<!-- ================= SIDEBAR ================= -->

<div class="sidebar">


    <!-- Dashboard -->

    <a
        href="dashboard.php"
        class="active"
    >

        <i class="bi bi-house-door"></i>

        Dashboard

    </a>



    <!-- Users -->

    <a href="users.php">

        <i class="bi bi-people"></i>

        Manage Users

    </a>



    <!-- Profile -->

    <a href="#">

        <i class="bi bi-person"></i>

        Profile

    </a>



    <!-- Settings -->

    <a href="#">

        <i class="bi bi-gear"></i>

        Settings

    </a>



    <hr class="text-secondary">



    <!-- Logout -->

    <a
        href="logout.php"
        class="text-danger"
    >

        <i class="bi bi-box-arrow-right"></i>

        Logout

    </a>


</div>



<!-- ================= MAIN CONTENT ================= -->

<div class="main-content">


    <div class="container-fluid">


        <!-- Welcome Section -->

        <div class="mb-4">


            <h2>

                Welcome,
                <?php echo $_SESSION['admin_name']; ?> 👋

            </h2>


            <p class="text-muted">

                Welcome to your Admin Dashboard.
                You can manage your users from here.

            </p>


        </div>



        <!-- ================= DASHBOARD CARDS ================= -->

        <div class="row g-4">


            <!-- Total Users -->

            <div class="col-md-4">


                <div class="card dashboard-card bg-primary text-white">


                    <div class="card-body">


                        <h5>

                            <i class="bi bi-people"></i>

                            Total Users

                        </h5>


                        <h1>0</h1>


                    </div>


                </div>


            </div>



            <!-- Active Users -->

            <div class="col-md-4">


                <div class="card dashboard-card bg-success text-white">


                    <div class="card-body">


                        <h5>

                            <i class="bi bi-person-check"></i>

                            Active Users

                        </h5>


                        <h1>0</h1>


                    </div>


                </div>


            </div>



            <!-- Logged In Admin -->

            <div class="col-md-4">


                <div class="card dashboard-card bg-warning">


                    <div class="card-body">


                        <h5>

                            <i class="bi bi-person-badge"></i>

                            Logged In Admin

                        </h5>


                        <h1>1</h1>


                    </div>


                </div>


            </div>


        </div>



        <!-- ================= BUTTON ================= -->

        <div class="mt-4">


            <a
                href="users.php"
                class="btn btn-primary"
            >

                <i class="bi bi-people"></i>

                Manage Users

            </a>


        </div>



        <!-- Extra Content For Testing Scroll -->

        <div class="card mt-5">


            <div class="card-body">


                <h4>Dashboard Information</h4>


                <p>

                    This is your admin dashboard.

                    When the page has more content, you can scroll normally.

                    The Navbar and Sidebar will remain fixed.

                </p>


                <br>


                <p>
                    Admin Panel Management System
                </p>


                <p>
                    You can add Users, Edit Users, Delete Users
                    and manage all user information.
                </p>


            </div>


        </div>


    </div>


</div>



<!-- ================= FOOTER ================= -->

<footer class="footer">


    <strong>

        Admin Panel © 2026

    </strong>


    <span class="text-muted">

        | All Rights Reserved

    </span>


</footer>



<!-- Bootstrap JS -->

<script
    src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js">
</script>


</body>

</html>