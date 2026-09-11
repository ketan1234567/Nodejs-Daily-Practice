const User = require("../models/User");
const bcrypt = require("bcryptjs");

// ======================================
// CREATE USER
// POST /api/users
// ======================================
const createUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role,
      status,
    } = req.body;

    // ----------------------------------
    // 1. Required fields validation
    // ----------------------------------
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required",
      });
    }

    // ----------------------------------
    // 2. Normalize email
    // ----------------------------------
    const normalizedEmail = email.trim().toLowerCase();

    // ----------------------------------
    // 3. Validate role
    // ----------------------------------
    if (
      role !== undefined &&
      !["admin", "user"].includes(role)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid role",
      });
    }

    // ----------------------------------
    // 4. Validate status
    // ----------------------------------
    if (
      status !== undefined &&
      !["Active", "Inactive"].includes(status)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    // ----------------------------------
    // 5. Check duplicate email
    // ----------------------------------
    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already exists",
      });
    }

    // ----------------------------------
    // 6. Hash password
    // ----------------------------------
    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    // ----------------------------------
    // 7. Create user
    // ----------------------------------
    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      role: role || "user",
      status: status || "Active",
    });

    // ----------------------------------
    // 8. Remove password from response
    // ----------------------------------
    const userResponse = user.toObject();

    delete userResponse.password;

    // ----------------------------------
    // 9. Response
    // ----------------------------------
    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: userResponse,
    });

  } catch (error) {
    console.error("Create User Error:", error);

    // MongoDB duplicate key error
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Email already exists",
      });
    }

    return res.status(500).json({
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

    return res.status(200).json({
      success: true,
      count: users.length,
      users,
    });

  } catch (error) {
    console.error("Get Users Error:", error);

    return res.status(500).json({
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

    const { id } = req.params;

    // ----------------------------------
    // Validate MongoDB ID
    // ----------------------------------
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    // ----------------------------------
    // Find user
    // ----------------------------------
    const user = await User.findById(id)
      .select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });

  } catch (error) {
    console.error("Get User Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


// ======================================
// UPDATE USER
// PATCH /api/users/:id
// ======================================
const updateUser = async (req, res) => {
  try {

    const { id } = req.params;

    const {
      name,
      email,
      password,
      role,
      status,
    } = req.body;

    // ----------------------------------
    // Validate MongoDB ID
    // ----------------------------------
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    // ----------------------------------
    // Find user
    // ----------------------------------
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // ----------------------------------
    // Update name
    // ----------------------------------
    if (name !== undefined) {

      if (!name.trim()) {
        return res.status(400).json({
          success: false,
          message: "Name cannot be empty",
        });
      }

      user.name = name.trim();
    }

    // ----------------------------------
    // Update email
    // ----------------------------------
    if (email !== undefined) {

      const normalizedEmail =
        email.trim().toLowerCase();

      if (!normalizedEmail) {
        return res.status(400).json({
          success: false,
          message: "Email cannot be empty",
        });
      }

      // Check duplicate email
      const emailExists = await User.findOne({
        email: normalizedEmail,
        _id: { $ne: id },
      });

      if (emailExists) {
        return res.status(409).json({
          success: false,
          message: "Email already exists",
        });
      }

      user.email = normalizedEmail;
    }

    // ----------------------------------
    // Update role
    // ----------------------------------
    if (role !== undefined) {

      if (
        !["admin", "user"].includes(role)
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid role",
        });
      }

      user.role = role;
    }

    // ----------------------------------
    // Update status
    // ----------------------------------
    if (status !== undefined) {

      if (
        !["Active", "Inactive"].includes(status)
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid status",
        });
      }

      user.status = status;
    }

    // ----------------------------------
    // Update password
    // ----------------------------------
    if (password !== undefined) {

      if (!password.trim()) {
        return res.status(400).json({
          success: false,
          message: "Password cannot be empty",
        });
      }

      user.password = await bcrypt.hash(
        password,
        10
      );
    }

    // ----------------------------------
    // Save
    // ----------------------------------
    await user.save();

    // ----------------------------------
    // Remove password
    // ----------------------------------
    const userResponse = user.toObject();

    delete userResponse.password;

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: userResponse,
    });

  } catch (error) {
    console.error("Update User Error:", error);

    // Duplicate email
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Email already exists",
      });
    }

    return res.status(500).json({
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

    const { id } = req.params;

    // ----------------------------------
    // Validate MongoDB ID
    // ----------------------------------
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    // ----------------------------------
    // Find user
    // ----------------------------------
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // ----------------------------------
    // Delete user
    // ----------------------------------
    await User.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });

  } catch (error) {
    console.error("Delete User Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


// ======================================
// EXPORT
// ======================================
module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};