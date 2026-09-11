import axios from "axios";

const API_URL = "http://localhost:5000/api/tasks";

// Get token
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// GET ALL TASKS
export const getTasks = async () => {
  const response = await axios.get(
    API_URL,
    getAuthHeaders()
  );

  return response.data;
};

// GET SINGLE TASK
export const getTaskById = async (id) => {
  const response = await axios.get(
    `${API_URL}/${id}`,
    getAuthHeaders()
  );

  return response.data;
};

// CREATE TASK
export const createTask = async (taskData) => {
  const response = await axios.post(
    API_URL,
    taskData,
    getAuthHeaders()
  );

  return response.data;
};

// UPDATE TASK
export const updateTask = async (id, taskData) => {
  const response = await axios.put(
    `${API_URL}/${id}`,
    taskData,
    getAuthHeaders()
  );

  return response.data;
};

// DELETE TASK
export const deleteTask = async (id) => {
  const response = await axios.delete(
    `${API_URL}/${id}`,
    getAuthHeaders()
  );

  return response.data;
};