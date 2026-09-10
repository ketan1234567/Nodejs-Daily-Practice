import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside
      className="bg-dark text-white p-3"
      style={{
        width: "250px",
        minHeight: "calc(100vh - 56px)",
      }}
    >

      <h6 className="text-uppercase text-secondary mb-3">
        Main Menu
      </h6>

      <ul className="nav nav-pills flex-column gap-2">

        {/* Dashboard */}
        <li className="nav-item">
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : "text-white"}`
            }
          >
            <i className="bi bi-speedometer2 me-2"></i>
            Dashboard
          </NavLink>
        </li>

        {/* Tasks */}
        <li className="nav-item">
          <NavLink
            to="/admin/tasks"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : "text-white"}`
            }
          >
            <i className="bi bi-check2-square me-2"></i>
            Tasks
          </NavLink>
        </li>

        {/* Users */}
        <li className="nav-item">
          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : "text-white"}`
            }
          >
            <i className="bi bi-people me-2"></i>
            Users
          </NavLink>
        </li>

        {/* Reports */}
        <li className="nav-item">
          <NavLink
            to="/admin/reports"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : "text-white"}`
            }
          >
            <i className="bi bi-bar-chart me-2"></i>
            Reports
          </NavLink>
        </li>

        <hr />

        <h6 className="text-uppercase text-secondary">
          Account
        </h6>

        {/* Profile */}
        <li className="nav-item">
          <NavLink
            to="/user/profile"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : "text-white"}`
            }
          >
            <i className="bi bi-person me-2"></i>
            Profile
          </NavLink>
        </li>

        {/* Settings */}
        <li className="nav-item">
          <NavLink
            to="/admin/settings"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : "text-white"}`
            }
          >
            <i className="bi bi-gear me-2"></i>
            Settings
          </NavLink>
        </li>

      </ul>
    </aside>
  );
}

export default Sidebar;