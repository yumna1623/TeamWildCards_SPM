
import Task from "../models/Task.js";
import User from "../models/User.js";
import Team from "../models/Team.js";
import Department from "../models/Department.js";

// Create Task (Admin assigns)
export const createTask = async (req, res) => {
  try {
    const { title, description, assignedTo, deadline, priority, department } = req.body;

    const admin = await User.findById(req.user.id);
    const team = await Team.findById(admin.team);
    if (!team) return res.status(404).json({ message: "Team not found" });

    // verify member is in team
    const member = await User.findOne({ _id: assignedTo, team: team._id });
    if (!member) {
      return res.status(400).json({ message: "Assigned member not found in team" });
    }

    const task = await Task.create({
      title,
      description,
      deadline,
      priority,
      department,
      assignedTo: member._id,
      memberName: member.name,
      memberEmail: member.email,
      team: team._id,
      createdBy: admin._id,
    });

    // link to department
    if (department) {
      const dept = await Department.findById(department);
      if (dept) {
        dept.tasks.push(task._id);
        await dept.save();
      }
    }

    res.status(201).json({ message: "✅ Task created successfully", task });
  } catch (err) {
    console.error("❌ Error creating task:", err);
    res.status(500).json({ message: err.message });
  }
};

// Get tasks assigned to logged-in user
export const getMyTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ assignedTo: req.user._id })
.populate("assignedTo", "name email")
      

    res.json(tasks);
  } catch (err) {
    console.error("Error fetching my tasks:", err);
    res.status(500).json({ message: "Server error" });
  }
};



// Update task status (only by assigned user)
export const updateTaskStatus = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    if (task.assignedTo.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to update this task" });
    }

    task.status = req.body.status || task.status;
    await task.save();

    // repopulate before sending
    const updatedTask = await Task.findById(task._id)
      .populate("department", "name")
      .populate("assignedTo", "name email");

    res.json(updatedTask);
  } catch (err) {
    console.error("Error updating task status:", err);
    res.status(500).json({ message: err.message });
  }
};


export const getTeamTasks = async (req, res) => {
  try {
    const { teamId } = req.params;

    const tasks = await Task.find({ team: teamId })
      .populate("assignedTo", "name email");

    res.json(tasks);
  } catch (error) {
    console.error("Error fetching team tasks:", error);
    res.status(500).json({ message: "Server error" });
  }
};





