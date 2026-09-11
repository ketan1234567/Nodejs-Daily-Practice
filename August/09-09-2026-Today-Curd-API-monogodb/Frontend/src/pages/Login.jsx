import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e) => {
  e.preventDefault();

  setError("");
  setLoading(true);

  try {
    const data = await loginUser(formData);

    // Clear old login data
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Save new JWT token
    localStorage.setItem("token", data.token);

    // Save logged-in user
    localStorage.setItem(
      "user",
      JSON.stringify(data.user)
    );

    // Role based redirect
    if (data.user.role === "admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/user/dashboard");
    }

  } catch (error) {

    console.log("Login Error:", error);
    console.log("Status:", error.response?.status);
    console.log(
      "Backend Response:",
      error.response?.data
    );

    setError(
      error.response?.data?.message ||
      "Login failed. Please try again."
    );

  } finally {
    setLoading(false);
  }
};

 

  return (
    <div className="container-fluid min-vh-100 bg-light d-flex justify-content-center align-items-center">

      <div
        className="card shadow"
        style={{ width: "400px" }}
      >
        <div className="card-body p-4">

          <div className="text-center mb-4">
            <h2 className="fw-bold">
              Task Manager
            </h2>

            <p className="text-muted">
              Login to your account
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="alert alert-danger">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            {/* Email */}
            <div className="mb-3">
              <label className="form-label">
                Email
              </label>

              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password */}
            <div className="mb-3">
              <label className="form-label">
                Password
              </label>

              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>

        </div>
      </div>

    </div>
  );
}

export default Login;