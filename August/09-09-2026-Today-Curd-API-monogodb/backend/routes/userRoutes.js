const express = require("express");

const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controller/userController");

const router = express.Router();

// Create User
// POST /api/users
router.post("/", createUser);

// Get All Users
// GET /api/users
router.get("/", getUsers);

// Get Single User
// GET /api/users/:id
router.get("/:id", getUserById);

// Update User
// PUT /api/users/:id
router.put("/:id", updateUser);

// Delete User
// DELETE /api/users/:id
router.delete("/:id", deleteUser);

module.exports = router;