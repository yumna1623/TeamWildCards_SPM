// taskController.js
import Department from "../models/Department.js";
import Task from "../models/Task.js";

export const createTask = async (req, res) => {
  try {
    const { title, description, memberName, memberEmail, deadline, priority, departmentName } = req.body;

    // ✅ find department by name (case-insensitive)
    const department = await Department.findOne({
      name: { $regex: new RegExp(`^${departmentName}$`, "i") },
      team: req.user.team._id || req.user.team, // handle both cases
    });

    if (!department) {
      return res.status(404).json({ message: "Department not found in your team" });
    }

    // ✅ create task
    const task = await Task.create({
      title,
      description,
      memberName,
      memberEmail,
      deadline,
      priority,
      department: department._id,
    });

    // ✅ push into department
    department.tasks.push(task._id);
    await department.save();

    res.status(201).json({ message: "Task created successfully", task });
  } catch (err) {
    console.error("Error creating task:", err);
    res.status(500).json({ message: "Server error" });
  }
};



// Get all tasks for the user's team
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ team: req.user.team })
      .populate("department", "name")   // get department name
      // .populate("assignedTo", "name email") // if using User ObjectId
    res.json(tasks);
  } catch (err) {
    console.error("Error fetching tasks:", err);
    res.status(500).json({ message: err.message });
  }
};

// Update task status
export const updateTaskStatus = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    task.status = req.body.status || task.status;
    await task.save();

    res.json(task);
  } catch (err) {
    console.error("Error updating task status:", err);
    res.status(500).json({ message: err.message });
  }
};

