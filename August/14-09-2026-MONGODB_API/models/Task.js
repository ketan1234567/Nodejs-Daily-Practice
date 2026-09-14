const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    // Task title
    title: {
      type: String,
      required: true,
      trim: true,
    },

    // Task description
    description: {
      type: String,
      trim: true,
    },

    // User assigned to task
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Admin who created the task
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Task priority
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },

    // Task status
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending",
    },

    // Task due date
    dueDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Task", taskSchema);