const User = require("../models/User");
const bcrypt = require("bcryptjs");

// ======================================
// CREATE USER
// POST /api/users
// ======================================
const createUser = async (req, res) => {
  try {
    const { name, email, password, role, status } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required",
      });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "user",
      status: status || "Active",
    });

    // Don't send password in response
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: userResponse,
    });
  } catch (error) {
    console.error("Create User Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ======================================
// GET ALL USERS
// GET /api/users
// ======================================
const getUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    console.error("Get Users Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ======================================
// GET SINGLE USER
// GET /api/users/:id
// ======================================
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Get User Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ======================================
// UPDATE USER
// PUT /api/users/:id
// ======================================
const updateUser = async (req, res) => {
  try {
    const { name, email, password, role, status } = req.body;

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check email uniqueness
    if (email && email !== user.email) {
      const emailExists = await User.findOne({
        email,
        _id: { $ne: req.params.id },
      });

      if (emailExists) {
        return res.status(409).json({
          success: false,
          message: "Email already exists",
        });
      }

      user.email = email;
    }

    if (name) {
      user.name = name;
    }

    if (role) {
      user.role = role;
    }

    if (status) {
      user.status = status;
    }

    // Hash new password if provided
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();

    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: userResponse,
    });
  } catch (error) {
    console.error("Update User Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ======================================
// DELETE USER
// DELETE /api/users/:id
// ======================================
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Delete User Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};