import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

// Login API
export const loginUser = async (loginData) => {
  const response = await axios.post(
    `${API_URL}/login`,
    loginData
  );

  return response.data;
};

// Logout
export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

// Get logged-in user
export const getCurrentUser = () => {
  const user = localStorage.getItem("user");

  return user ? JSON.parse(user) : null;
};

// Get token
export const getToken = () => {
  return localStorage.getItem("token");
};