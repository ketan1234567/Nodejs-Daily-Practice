import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({ allowedRoles }) {

  const token = localStorage.getItem("token");
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  // Login नाही
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // Role allowed नाही
  if (
    allowedRoles &&
    !allowedRoles.includes(user.role)
  ) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;