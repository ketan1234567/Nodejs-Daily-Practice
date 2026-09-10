const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

// Database connection
const connectDB = require("./config/db");

// Routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// ======================================
// DATABASE
// ======================================

connectDB();

// ======================================
// MIDDLEWARE
// ======================================

// Allow requests from React frontend
app.use(cors());

// Parse JSON request body
app.use(express.json());

// Parse URL encoded data
app.use(express.urlencoded({ extended: true }));

// ======================================
// ROUTES
// ======================================

app.use("/api/auth", authRoutes);

app.use("/api/users", userRoutes);

app.use("/api/tasks", taskRoutes);

// ======================================
// TEST ROUTE
// ======================================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Task Management API is running",
  });
});

// ======================================
// 404 ROUTE
// ======================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// ======================================
// ERROR HANDLER
// ======================================

app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

// ======================================
// SERVER
// ======================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});