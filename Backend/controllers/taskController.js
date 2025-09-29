// // // taskController.js
// // import Department from "../models/Department.js";
// // import Task from "../models/Task.js";
// // export const createTask = async (req, res) => {
// //   try {
// //     const { title, description, memberName, memberEmail, deadline, priority, department } = req.body;

// //     // 🔑 Find department by ID + team
// //     const dept = await Department.findOne({
// //       _id: department,
// //       team: req.user.team._id || req.user.team,
// //     });

// //     if (!dept) {
// //       return res.status(404).json({ message: "Department not found in your team" });
// //     }

// //     const task = await Task.create({
// //       title,
// //       description,
// //       memberName,
// //       memberEmail,
// //       deadline,
// //       priority,
// //       department: dept._id,
// //     });

// //     dept.tasks.push(task._id);
// //     await dept.save();

// //     res.status(201).json({ message: "Task created successfully", task });
// //   } catch (err) {
// //     console.error("Error creating task:", err);
// //     res.status(500).json({ message: "Server error" });
// //   }
// // };




// // // Get all tasks for the user's team
// // export const getTasks = async (req, res) => {
// //   try {
// //     const tasks = await Task.find({ team: req.user.team })
// //       .populate("department", "name")   // get department name
// //       // .populate("assignedTo", "name email") // if using User ObjectId
// //     res.json(tasks);
// //   } catch (err) {
// //     console.error("Error fetching tasks:", err);
// //     res.status(500).json({ message: err.message });
// //   }
// // };

// // // Update task status
// // export const updateTaskStatus = async (req, res) => {
// //   try {
// //     const task = await Task.findById(req.params.id);
// //     if (!task) return res.status(404).json({ message: "Task not found" });

// //     task.status = req.body.status || task.status;
// //     await task.save();

// //     res.json(task);
// //   } catch (err) {
// //     console.error("Error updating task status:", err);
// //     res.status(500).json({ message: err.message });
// //   }
// // };
// // backend/controllers/taskController.js
// // backend/controllers/taskController.js
// import Task from "../models/Task.js";
// import User from "../models/User.js";
// import Team from "../models/Team.js";


// export const createTask = async (req, res) => {
//   try {
//     const { title, description, assignedTo, deadline, priority, department } = req.body;

//     // requester is admin (already checked in route with adminOnly)
//     const admin = await User.findById(req.user.id);
//     const team = await Team.findById(admin.team);
//     if (!team) return res.status(404).json({ message: "Team not found" });

//     // verify member is in team
//     const member = await User.findOne({ _id: assignedTo, team: team._id });
//     if (!member) {
//       return res.status(400).json({ message: "Assigned member not found in team" });
//     }

//     const task = await Task.create({
//       title,
//       description,
//       deadline,
//       priority,
//       department,
//       assignedTo: member._id,
//       memberName: member.name,
//       memberEmail: member.email,
//       team: team._id,
//       createdBy: admin._id,
//     });

//     res.status(201).json({
//       message: "✅ Task created successfully",
//       task,
//     });
//   } catch (err) {
//     console.error("❌ Error creating task:", err);
//     res.status(500).json({ message: err.message });
//   }
// };


// // Get all tasks for logged-in user
// // export const getTasks = async (req, res) => {
// //   try {
// //     const tasks = await Task.find({ assignedTo: req.user._id })
// //       .populate("department", "name")
// //       .populate("assignedTo", "name email");
// //     res.json(tasks);
// //   } catch (err) {
// //     console.error("Error fetching tasks:", err);
// //     res.status(500).json({ message: err.message });
// //   }
// // };
// export const getTasks = async (req, res) => {
//   try {
//     // req.user should come from auth middleware (decoded from JWT)
//     const userEmail = req.user.email;

//     const tasks = await Task.find({ assignedTo: userEmail })
//       .populate("department", "name"); // if you store dept ref

//     res.json(tasks);
//   } catch (err) {
//     console.error("Error fetching tasks:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };


// // Update task status
// export const updateTaskStatus = async (req, res) => {
//   try {
//     const task = await Task.findById(req.params.id);
//     if (!task) return res.status(404).json({ message: "Task not found" });

//     // Only assigned user should update their task
//     if (task.assignedTo.toString() !== req.user._id.toString()) {
//       return res.status(403).json({ message: "Not authorized to update this task" });
//     }

//     task.status = req.body.status || task.status;
//     await task.save();

//     res.json(task);
//   } catch (err) {
//     console.error("Error updating task status:", err);
//     res.status(500).json({ message: err.message });
//   }
// };


import Task from "../models/Task.js";
import User from "../models/User.js";
import Team from "../models/Team.js";
import Department from "../models/Department.js";

// Create Task
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

    // ✅ also link task to department
    if (department) {
      const dept = await Department.findById(department);
      if (dept) {
        dept.tasks.push(task._id);
        await dept.save();
      }
    }

    res.status(201).json({
      message: "✅ Task created successfully",
      task,
    });
  } catch (err) {
    console.error("❌ Error creating task:", err);
    res.status(500).json({ message: err.message });
  }
};

// Get tasks for logged-in user
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ assignedTo: req.user._id })
      .populate("department", "name")
      .populate("assignedTo", "name email");

    res.json(tasks);
  } catch (err) {
    console.error("Error fetching tasks:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update task status
export const updateTaskStatus = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    if (task.assignedTo.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to update this task" });
    }

    task.status = req.body.status || task.status;
    await task.save();

    res.json(task);
  } catch (err) {
    console.error("Error updating task status:", err);
    res.status(500).json({ message: err.message });
  }
};

