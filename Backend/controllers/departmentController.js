import Department from "../models/Department.js";

export const createDepartment = async (req, res) => {
  try {
    const { name, team } = req.body;

    if (!name || !team) {
      return res.status(400).json({ message: "Name and team are required" });
    }

    const department = await Department.create({ name, team });

    res.status(201).json(department);
  } catch (error) {
    console.error("Error creating department:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getDepartments = async (req, res) => {
  try {
    const { teamId } = req.params;
    const departments = await Department.find({ team: teamId })
      .populate("tasks")
      .populate("members");
    res.json(departments);
  } catch (error) {
    console.error("Error fetching departments:", error);
    res.status(500).json({ message: "Server error" });
  }
};
