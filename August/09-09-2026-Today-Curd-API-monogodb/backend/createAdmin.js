const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");

const User = require("./models/User");

dotenv.config();

const createAdmin = async () => {
  try {
    // MongoDB connect
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    // Check existing admin
    const existingAdmin = await User.findOne({
      email: "admin@gmail.com",
    });

    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit();
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(
      "123456",
      10
    );

    // Create admin
    const admin = await User.create({
      name: "Admin",
      email: "admin@gmail.com",
      password: hashedPassword,
      role: "admin",
      status: "Active",
    });

    console.log("Admin created successfully");
    console.log("Email:", admin.email);
    console.log("Role:", admin.role);

    process.exit();
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
};

createAdmin();