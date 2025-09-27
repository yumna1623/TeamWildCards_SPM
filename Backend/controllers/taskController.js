import Task from "../models/Task.js";
import Department from "../models/Department.js";

export const createTask = async (req, res) => {
  const { title, description, dueDate, priority, assignedTo, departmentId } = req.body;

  try {
    const task = await Task.create({
      title,
      description,
      dueDate,
      priority,
      assignedTo,
      team: req.user.team,
      department: departmentId   // 👈 link department
    });

    // push task into department.tasks array
    if (departmentId) {
      await Department.findByIdAndUpdate(departmentId, { $push: { tasks: task._id } });
    }

    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ team: req.user.team })
      .populate("assignedTo", "name email")
      .populate("department", "name");
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
