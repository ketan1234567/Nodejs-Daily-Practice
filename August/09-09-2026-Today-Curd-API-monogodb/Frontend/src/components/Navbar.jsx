import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark px-3">
      <div className="container-fluid">

        {/* Logo */}
        <Link className="navbar-brand fw-bold" to="/admin/dashboard">
          Task Manager
        </Link>

        {/* Mobile Toggle */}
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

            {/* Notification */}
            <li className="nav-item me-3">
              <button className="btn btn-dark position-relative">
                <i className="bi bi-bell fs-5"></i>

                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  3
                </span>
              </button>
            </li>

            {/* User */}
            <li className="nav-item dropdown">

              <button
                className="nav-link dropdown-toggle d-flex align-items-center bg-transparent border-0"
                data-bs-toggle="dropdown"
              >
                <i className="bi bi-person-circle fs-4 me-2"></i>
                Admin
              </button>

              <ul className="dropdown-menu dropdown-menu-end">

                {/* Profile */}
                <li>
                  <Link
                    className="dropdown-item"
                    to="/user/profile"
                  >
                    <i className="bi bi-person me-2"></i>
                    Profile
                  </Link>
                </li>

                {/* Settings */}
                <li>
                  <Link
                    className="dropdown-item"
                    to="/admin/settings"
                  >
                    <i className="bi bi-gear me-2"></i>
                    Settings
                  </Link>
                </li>

                <li>
                  <hr className="dropdown-divider" />
                </li>

                {/* Logout - later we'll add functionality */}
                <li>
                  <button className="dropdown-item text-danger">
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