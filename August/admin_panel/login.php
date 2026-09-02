<?php

session_start();

if (isset($_SESSION['admin_id'])) {

    header("Location: dashboard.php");
    exit;
}

?>

<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="UTF-8">

    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Admin Login</title>

    <!-- Bootstrap CSS -->

    <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
        rel="stylesheet"
    >

</head>


<body class="bg-light">


<div class="container">

    <div class="row justify-content-center align-items-center min-vh-100">

        <div class="col-md-6 col-lg-5">

            <div class="card shadow-lg border-0">

                <!-- Header -->

                <div class="card-header bg-dark text-white text-center py-4">

                    <h2 class="mb-1">
                        Admin Panel
                    </h2>

                    <p class="mb-0 text-secondary">
                        Login to your dashboard
                    </p>

                </div>


                <!-- Body -->

                <div class="card-body p-4">

                    <form action="login_check.php" method="POST">


                        <!-- Email -->

                        <div class="mb-3">

                            <label class="form-label">
                                Email Address
                            </label>

                            <input
                                type="email"
                                name="email"
                                class="form-control form-control-lg"
                                placeholder="Enter your email"
                                required
                            >

                        </div>


                        <!-- Password -->

                        <div class="mb-4">

                            <label class="form-label">
                                Password
                            </label>

                            <input
                                type="password"
                                name="password"
                                class="form-control form-control-lg"
                                placeholder="Enter your password"
                                required
                            >

                        </div>


                        <!-- Login Button -->

                        <div class="d-grid">

                            <button
                                type="submit"
                                class="btn btn-primary btn-lg"
                            >
                                Login
                            </button>

                        </div>


                    </form>

                </div>


                <!-- Footer -->

                <div class="card-footer text-center bg-white">

                    <small class="text-muted">
                        Admin Panel © 2026
                    </small>

                </div>

            </div>

        </div>

    </div>

</div>


</body>

</html>