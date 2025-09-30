import Department from "../models/Department.js";

export const createDepartment = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Department name is required" });
    }

    const department = await Department.create({
      name,
      team: req.user.team, // automatically link to user's team
    });

    res.status(201).json(department);
  } catch (error) {
    console.error("Error creating department:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getDepartments = async (req, res) => {
  try {
    const teamId = req.user.team._id || req.user.team;

    const departments = await Department.find({ team: teamId })
      .populate({
        path: "tasks",
        populate: { path: "assignedTo", select: "name email" } // populate assigned user
      })
      .populate("members", "name email role"); // populate department members

    res.json(departments);
  } catch (error) {
    console.error("Error fetching departments:", error);
    res.status(500).json({ message: "Server error" });
  }
};




