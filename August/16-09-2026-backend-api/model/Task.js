
const mongoose = require("mongoose");

const taskEmployeeSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            required: true,
        },

        // User assigned to task
        assignedTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },

        // User who created the task
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        priority: {
            type: String,
            enum: ["High", "Low", "Medium"],
            default: "Medium",
            required: true,
        },

        status: {
            type: String,
            enum: ["Completed", "Pending", "Progress"],
            default: "Progress",
        },

        dueDate: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);

const Task = mongoose.model("Task", taskEmployeeSchema);

module.exports = Task;

