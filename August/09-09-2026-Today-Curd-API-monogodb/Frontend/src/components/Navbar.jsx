import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  // Get logged-in user
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  // Logout
  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

      navigate("/login", {
    replace: true,
  });
  };


  // User role
  const isAdmin = user?.role === "admin";


  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark px-3">

      <div className="container-fluid">


        {/* =================================
            LOGO
        ================================= */}

        <Link
          className="navbar-brand fw-bold"
          to={
            isAdmin
              ? "/admin/dashboard"
              : "/user/dashboard"
          }
        >
          Task Manager
        </Link>


        {/* =================================
            MOBILE TOGGLE
        ================================= */}

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>


        <div
          className="collapse navbar-collapse"
          id="navbarContent"
        >

          <ul className="navbar-nav ms-auto align-items-center">


            {/* =================================
                NOTIFICATION
            ================================= */}

            <li className="nav-item me-3">

              <button className="btn btn-dark position-relative">

                <i className="bi bi-bell fs-5"></i>

                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  3
                </span>

              </button>

            </li>


            {/* =================================
                USER
            ================================= */}

            <li className="nav-item dropdown">

              <button
                className="nav-link dropdown-toggle d-flex align-items-center bg-transparent border-0"
                data-bs-toggle="dropdown"
              >

                <i className="bi bi-person-circle fs-4 me-2"></i>

                {user?.name || "User"}

              </button>


              <ul className="dropdown-menu dropdown-menu-end">


                {/* =================================
                    PROFILE
                ================================= */}

                <li>

                  <Link
                    className="dropdown-item"
                    to="/user/profile"
                  >

                    <i className="bi bi-person me-2"></i>

                    Profile

                  </Link>

                </li>


                {/* =================================
                    SETTINGS
                ================================= */}

                <li>

                  <Link
                    className="dropdown-item"
                    to={
                      isAdmin
                        ? "/admin/settings"
                        : "/user/settings"
                    }
                  >

                    <i className="bi bi-gear me-2"></i>

                    Settings

                  </Link>

                </li>


                <li>
                  <hr className="dropdown-divider" />
                </li>


                {/* =================================
                    LOGOUT
                ================================= */}

                <li>

                  <button
                    className="dropdown-item text-danger"
                    onClick={handleLogout}
                  >

                    <i className="bi bi-box-arrow-right me-2"></i>

                    Logout

                  </button>

                </li>


              </ul>

            </li>

          </ul>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;