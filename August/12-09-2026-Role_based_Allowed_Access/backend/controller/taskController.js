const Task = require("../model/Task");
const User = require("../model/User");


const createTask=async(req,res)=>{
    try {
            const {
      title,
      description,
      assignedTo,
      priority,
      status,
      dueDate,
    } = req.body;

        if (!title || !assignedTo) {
      return res.status(400).json({
        success: false,
        message: "Title and assigned user are required",
      });
    }
        //check assigned user
    const user =await User.findById(assignedTo)

    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Assigned user not found",
      });
    }

    //only normaly user assigned to be task

    if (user.role  !==user) {
              return res.status(400).json({
        success: false,
        message: "Task can only be assigned to a user",
      });
    }

        // Create task
    const task = await Task.create({
      title,
      description,
      assignedTo,
      createdBy: req.user.id,
      priority: priority || "Medium",
      status: status || "Pending",
      dueDate,
    });


    const poplateTask=await Task.findById(task._id)
    .populate("assignedTo","name email")
        .populate("createdBy","name email")

    return res.status(201).json({
      success: true,
      message: "Task created successfully",
      task: poplateTask,
    });

        
    } catch (error) {
            console.error("Create Task Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
    }

}


