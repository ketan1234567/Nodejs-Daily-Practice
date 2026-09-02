<?php

session_start();

include "config.php";

if (!isset($_SESSION['admin_id'])) {

    header("Location: login.php");
    exit;
}

$search = "";

if (isset($_GET['search'])) {

    $search = trim($_GET['search']);

}


$limit = 5;


$page = 1;

if (isset($_GET['page']) && is_numeric($_GET['page'])) {

    $page = (int) $_GET['page'];

    if ($page < 1) {
        $page = 1;
    }

}

$search_safe = mysqli_real_escape_string($conn, $search);


$count_sql = "SELECT COUNT(*) AS total 
              FROM users
              WHERE first_name LIKE '%$search_safe%'
              OR last_name LIKE '%$search_safe%'";

$count_result = mysqli_query($conn, $count_sql);
$count_data = mysqli_fetch_assoc($count_result);
$total_users = $count_data['total'];


$total_pages = ceil($total_users / $limit);

if ($total_pages >
0 && $page > $total_pages) { $page = $total_pages; } $start = ($page - 1) * $limit; $sql = "SELECT * FROM users WHERE
first_name LIKE '%$search_safe%' OR last_name LIKE '%$search_safe%' ORDER BY id DESC LIMIT $start, $limit"; $result =
mysqli_query($conn, $sql); ?>

<!doctype html>

<html lang="en">
    <head>
        <meta charset="UTF-8" />

        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <title>Manage Users</title>

        <!-- Bootstrap CSS -->

        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />

        <!-- Bootstrap Icons -->

        <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
        />

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

            .top-navbar {
                height: 65px;

                position: fixed;

                top: 0;

                left: 0;

                width: 100%;

                z-index: 1000;
            }

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
            }

            .sidebar a:hover {
                background: #343a40;

                color: white;
            }

            .sidebar .active {
                background: #0d6efd;
            }

            .main-content {
                margin-left: 250px;

                margin-top: 65px;

                padding: 30px;

                min-height: calc(100vh - 130px);
            }

            .table-card {
                border: none;

                border-radius: 10px;

                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
            }
            .footer {
                margin-left: 250px;

                background: white;

                padding: 15px;

                text-align: center;

                border-top: 1px solid #ddd;
            }

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
        <nav class="navbar navbar-dark bg-dark top-navbar">
            <div class="container-fluid">
                <a class="navbar-brand ms-3" href="dashboard.php">
                    <i class="bi bi-speedometer2"></i>

                    Admin Panel
                </a>

                <div class="d-flex align-items-center">
                    <span class="text-white me-3">
                        Welcome, <?php echo htmlspecialchars($_SESSION['admin_name']); ?>
                    </span>

                    <a href="logout.php" class="btn btn-danger btn-sm me-3"> Logout </a>
                </div>
            </div>
        </nav>

        <div class="sidebar">
            <a href="dashboard.php">
                <i class="bi bi-house-door"></i>

                Dashboard
            </a>

            <a href="users.php" class="active">
                <i class="bi bi-people"></i>

                Manage Users
            </a>

            <a href="#">
                <i class="bi bi-person"></i>

                Profile
            </a>

            <a href="#">
                <i class="bi bi-gear"></i>

                Settings
            </a>

            <hr class="text-secondary" />

            <a href="logout.php" class="text-danger">
                <i class="bi bi-box-arrow-right"></i>

                Logout
            </a>
        </div>

        <!-- ================= MAIN CONTENT ================= -->

        <div class="main-content">
            <div class="container-fluid">
                <!-- Heading -->

                <div class="d-flex justify-content-between align-items-center mb-3">
                    <div>
                        <h2>
                            <i class="bi bi-people"></i>

                            Manage Users
                        </h2>

                        <p class="text-muted">Total Users: <?php echo $total_users; ?></p>
                    </div>

                    <a href="add_user.php" class="btn btn-success">
                        <i class="bi bi-person-plus"></i>

                        Add User
                    </a>
                </div>

                <form method="GET" action="users.php" class="mb-4">
                    <div class="row g-2">
                        <div class="col-md-5">
                            <input
                                type="text"
                                name="search"
                                class="form-control"
                                placeholder="Search by first name or last name..."
                                value="<?php echo htmlspecialchars($search); ?>"
                            />
                        </div>

                        <div class="col-md-4">
                            <button type="submit" class="btn btn-primary">
                                <i class="bi bi-search"></i>

                                Search
                            </button>

                            <a href="users.php" class="btn btn-secondary"> Reset </a>
                        </div>
                    </div>
                </form>

                <div class="card table-card">
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered table-hover align-middle">
                                <thead class="table-dark">
                                    <tr>
                                        <th>ID</th>

                                        <th>First Name</th>

                                        <th>Last Name</th>

                                        <th>Email</th>

                                        <th>City</th>

                                        <th>Country</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <?php if (mysqli_num_rows($result) > 0) { while ($user =
                                    mysqli_fetch_assoc($result)) { ?>

                                    <tr>
                                        <td><?php echo $user['id']; ?></td>

                                        <td><?php echo htmlspecialchars($user['first_name']); ?></td>

                                        <td><?php echo htmlspecialchars($user['last_name']); ?></td>

                                        <td><?php echo htmlspecialchars($user['email']); ?></td>

                                        <td><?php echo htmlspecialchars($user['city']); ?></td>

                                        <td><?php echo htmlspecialchars($user['country']); ?></td>
                                    </tr>

                                    <?php } } else { ?>

                                    <tr>
                                        <td colspan="6" class="text-center text-danger">No Users Found</td>
                                    </tr>

                                    <?php } ?>
                                </tbody>
                            </table>
                        </div>

                        <?php if ($total_pages > 1) { ?>

                        <nav>
                            <ul class="pagination justify-content-center">
                                <!-- PREVIOUS -->

                                <?php if ($page > 1) { ?>

                                <li class="page-item">
                                    <a
                                        class="page-link"
                                        href="users.php?page=<?php echo $page - 1; ?>&search=<?php echo urlencode($search); ?>"
                                    >
                                        Previous
                                    </a>
                                </li>

                                <?php } ?> <?php for ($i = 1; $i <= $total_pages; $i++) { ?>

                                <li class="page-item <?php echo ($page == $i) ? 'active' : ''; ?>">
                                    <a
                                        class="page-link"
                                        href="users.php?page=<?php echo $i; ?>&search=<?php echo urlencode($search); ?>"
                                    >
                                        <?php echo $i; ?>
                                    </a>
                                </li>

                                <?php } ?>

                                <!-- NEXT -->

                                <?php if ($page < $total_pages) { ?>

                                <li class="page-item">
                                    <a
                                        class="page-link"
                                        href="users.php?page=<?php echo $page + 1; ?>&search=<?php echo urlencode($search); ?>"
                                    >
                                        Next
                                    </a>
                                </li>

                                <?php } ?>
                            </ul>
                        </nav>

                        <?php } ?>
                    </div>
                </div>
            </div>
        </div>

        <footer class="footer">
            <strong> Admin Panel © 2026 </strong>

            <span class="text-muted"> | All Rights Reserved </span>
        </footer>
    </body>
</html>




<!-- Bootstrap JS -->

<script
    src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js">
</script>


</body>

</html>