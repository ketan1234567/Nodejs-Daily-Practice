import axios from "axios";

const API_URL = "http://localhost:5000/api/users";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// ======================================
// GET ALL USERS
// ======================================
export const getUsers = async () => {
  const response = await axios.get(
    API_URL,
    getAuthHeaders()
  );

  return response.data;
};

// ======================================
// CREATE USER
// ======================================
export const createUser = async (userData) => {
  const response = await axios.post(
    API_URL,
    userData,
    getAuthHeaders()
  );

  return response.data;
};

// ======================================
// UPDATE USER
// ======================================
export const updateUser = async (id, userData) => {
  const response = await axios.patch(
    `${API_URL}/${id}`,
    userData,
    getAuthHeaders()
  );

  return response.data;
};

// ======================================
// DELETE USER
// ======================================
export const deleteUser = async (id) => {
  const response = await axios.delete(
    `${API_URL}/${id}`,
    getAuthHeaders()
  );

  return response.data;
};