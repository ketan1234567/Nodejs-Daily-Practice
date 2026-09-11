import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";

import AdminDashboard from "../pages/admin/AdminDashboard";
import Users from "../pages/admin/Users";
import AllTasks from "../pages/admin/AllTasks";

import Login from "../pages/Login";

import UserDashboard from "../pages/user/UserDashboard";
import MyTasks from "../pages/user/MyTasks";
import Profile from "../pages/user/Profile";


function AppRoutes() {

  return (
    <Routes>

      {/* PUBLIC */}

      <Route
        path="/login"
        element={<Login />}
      />


      {/* ADMIN ROUTES */}

      <Route
        element={
          <ProtectedRoute
            allowedRoles={["admin"]}
          />
        }
      >

        <Route
          path="/admin/dashboard"
          element={<AdminDashboard />}
        />

        <Route
          path="/admin/users"
          element={<Users />}
        />

        <Route
          path="/admin/tasks"
          element={<AllTasks />}
        />

      </Route>


      {/* USER ROUTES */}

      <Route
        element={
          <ProtectedRoute
            allowedRoles={["user"]}
          />
        }
      >

        <Route
          path="/user/dashboard"
          element={<UserDashboard />}
        />

        <Route
          path="/user/tasks"
          element={<MyTasks />}
        />

        <Route
          path="/user/profile"
          element={<Profile />}
        />

      </Route>

    </Routes>
  );
}

export default AppRoutes;