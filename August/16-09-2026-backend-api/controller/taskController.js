
const User = require("../model/User");
const Task = require("../model/Task");

// =========================
// Create Task
// =========================
const registerTask = async (req, res) => {
    try {
        const {
            title,
            description,
            assignedTo,
            priority,
            status,
            dueDate,
        } = req.body;

        // Required fields
        if (!title || !description) {
            return res.status(400).json({
                success: false,
                message: "Title and description are required",
            });
        }

        // Check assigned user
        const user = await User.findById(assignedTo);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Assigned user not found",
            });
        }

        // Only User role can be assigned a task
        if (user.role !== "User") {
            return res.status(400).json({
                success: false,
                message: "Task can only be assigned to a user",
            });
        }

        const task = await Task.create({
            title,
            description,
            assignedTo,
            createdBy: req.user.id,
            priority: priority || "Medium",
            status: status || "Progress",
            dueDate,
        });

        const populatedTask = await Task.findById(task._id)
            .populate("assignedTo", "name email")
            .populate("createdBy", "name email");

        return res.status(201).json({
            success: true,
            message: "Task created successfully",
            task: populatedTask,
        });

    } catch (error) {
        console.error("Create Task Error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};


// =========================
// Get Tasks
// =========================
const getTask = async (req, res) => {
    try {
        let tasks;

        // Admin can see all tasks
        if (req.user.role === "Admin") {

            tasks = await Task.find()
                .populate("assignedTo", "name email")
                .populate("createdBy", "name email")
                .sort({ createdAt: 1 });

        } else {

            // User can see only assigned tasks
            tasks = await Task.find({
                assignedTo: req.user.id,
            })
                .populate("assignedTo", "name email")
                .populate("createdBy", "name email")
                .sort({ createdAt: 1 });
        }

        return res.status(200).json({
            success: true,
            count: tasks.length,
            tasks,
        });

    } catch (error) {
        console.error("Get Task Error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};


// =========================
// Update Task
// =========================
const updateTask = async (req, res) => {
    try {
        const {
            title,
            description,
            assignedTo,
            priority,
            status,
            dueDate,
        } = req.body;

        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found",
            });
        }

        // =========================
        // USER
        // =========================
        if (req.user.role === "User") {

            // User can update only their assigned task
            if (
                task.assignedTo.toString() !==
                req.user.id.toString()
            ) {
                return res.status(403).json({
                    success: false,
                    message: "You are not authorized to update this task",
                });
            }

            // User can update only status
            if (status !== undefined) {
                task.status = status;
            }
        }


        // =========================
        // ADMIN
        // =========================
        if (req.user.role === "Admin") {

            if (title !== undefined) {
                task.title = title;
            }

            if (description !== undefined) {
                task.description = description;
            }

            if (assignedTo !== undefined) {

                const user = await User.findById(assignedTo);

                if (!user) {
                    return res.status(404).json({
                        success: false,
                        message: "Assigned user not found",
                    });
                }

                if (user.role !== "User") {
                    return res.status(400).json({
                        success: false,
                        message: "Task can only be assigned to a user",
                    });
                }

                task.assignedTo = assignedTo;
            }

            if (priority !== undefined) {
                task.priority = priority;
            }

            if (status !== undefined) {
                task.status = status;
            }

            if (dueDate !== undefined) {
                task.dueDate = dueDate;
            }
        }

        await task.save();

        const updatedTask = await Task.findById(task._id)
            .populate("assignedTo", "name email")
            .populate("createdBy", "name email");

        return res.status(200).json({
            success: true,
            message: "Task updated successfully",
            task: updatedTask,
        });

    } catch (error) {
        console.error("Update Task Error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};


// =========================
// Delete Task
// =========================
const deleteTask = async (req, res) => {
    try {

        // Only Admin can delete
        if (req.user.role !== "Admin") {
            return res.status(403).json({
                success: false,
                message: "Only admin can delete tasks",
            });
        }

        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found",
            });
        }

        await Task.findByIdAndDelete(req.params.id);

        return res.status(200).json({
            success: true,
            message: "Task deleted successfully",
        });

    } catch (error) {
        console.error("Delete Task Error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};


module.exports = {
    registerTask,
    getTask,
    updateTask,
    deleteTask,
};

// ### एक महत्त्वाची गोष्ट

// तुझ्या **User schema मध्ये** role values जर:

// ```js
// enum: ["Admin", "User"]
// ```

// अशा आहेत, तर controller मध्येही exactly:

// ```js
// "Admin"
// "User"
// ```

// हेच वापर. JavaScript मध्ये `"Admin"` आणि `"admin"` वेगळे आहेत.

// तसंच तुझ्या Task schema मध्ये:

// ```js
// enum: ["Completed", "Pending", "Progress"]
// ```

// आहे, त्यामुळे default सुद्धा:

// ```js
// default: "Progress"
// ```

// असणं योग्य आहे.
