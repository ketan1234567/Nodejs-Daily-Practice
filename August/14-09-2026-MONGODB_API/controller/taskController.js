
const User = require("../models/User");
const Task = requre("./models/Task")

const CreateTask = async (req, res) => {
    try {
        const { title, description, assignedTo, createdBy, priority, status, dueDate } = req.body

        if (!title && !assignedTo) {
            return res.status(400).json({
                success: false,
                message: "Title and assigned user are required",
            });

        }

        //check assigned User 

        const user = await User.findById(assignedTo)

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Assigned User Not Found",
            });
        }

        if (user.role !== "user") {
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
            status: status || "Pending",
            dueDate,
        })

        const popultatetask = await Task.findById(task._id)
            .populate("assignedTo", name, email)
            .populate("createdBy", name, email)


        return res.status(201).json({
            success: true,
            message: "Task created successfully",
            task: popultatetask,
        });

    } catch (error) {
        console.error("Create Task Error:", error);

        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }

}

const getTask = async (req, res) => {
    try {

        let tasks;

        if (req.user.role === "admin") {

            tasks = await Task.find()
                .populate("assignedTo", "name email")
                .populate("createdBy", "name email")
                .sort({ createdAt: -1 })
        } else {
            tasks = await Task.find({ assignedTo: req.user.id })
                .populate("assignedTo", "name email")
                .populate("createdBy", "name email")
                .sort({ createdAt: -1 })
        }

        return res.status(200).json({
            success: true,
            count: tasks.length,
            tasks,
        });

    } catch (error) {

        console.error("Get Tasks Error:", error);

        return res.status(500).json({
            success: false,
            message: "Server error",
        });

    }

}


const updateTask = async (req, res) => {
    try {
        const { title,
            description,
            assignedTo,
            priority,
            status,
            dueDate, } = req.body

        const task = await Task.findById(req.params.id)

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found",
            });


        }

        if (req.user.role === "user") {

            if (task.assignedTo.toString() !== req.user.id.toString()) {
                return res.status(403).json({
                    success: false,
                    message: "You are not authorized to update this task",
                });
            }

            if (status !== undefined)
                task.status = status;

        }

        //admin


        if (req.user.role === "admin") {
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

                if (user.role !== "user") {
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

        console.error("Update Task Error:", error);


        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }

}

const deleteTask = async (req, res) => {
    try {

        const task = await Task.findById(req.params.id)

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
        console.error("Delete Task Error:", error);

        return res.status(500).json({
            success: false,
            message: "Server error",
        })
    }

}

module.exports = {
    CreateTask,
    getTask,
    updateTask,
    deleteTask
}
