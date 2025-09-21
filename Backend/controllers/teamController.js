import User from "../models/User.js";
import Team from "../models/Team.js";
import jwt from "jsonwebtoken";

// ✅ Create Team (admin becomes leader)
export const createTeam = async (req, res) => {
  const { name, email, password, teamName, passcode } = req.body;

  try {
    // 1. Check if admin already exists
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Admin with this email already exists" });
    }

    // 2. Create admin
    const admin = new User({
      name,
      email,
      password, // hashed by schema
      role: "admin",
    });
    await admin.save();

    // 3. Create team
    const team = new Team({
      name: teamName,
      passcode,
      createdBy: admin._id,
      members: [admin._id],
    });
    await team.save();

    // 4. Link admin to team
    admin.team = team._id;
    await admin.save();

    // 5. JWT
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "30d" });

    res.status(201).json({
      message: "Team created successfully",
      team,
      admin,
      token,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Join Team
export const joinTeam = async (req, res) => {
  const { name, email, password, passcode } = req.body;

  try {
    // 1. Find team
    const team = await Team.findOne({ passcode });
    if (!team) {
      return res.status(400).json({ message: "Invalid team passcode" });
    }

    // 2. Prevent duplicate
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists" });
    }

    // 3. Create user
    const user = new User({
      name,
      email,
      password,
      role: "user",
      team: team._id,
    });
    await user.save();

    // 4. Add to team
    team.members.push(user._id);
    await team.save();

    // 5. JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "30d" });

    res.status(201).json({
      message: "Joined team successfully",
      user,
      team,
      token,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Dashboard Info (admin/user details + team)
export const getTeamDashboard = async (req, res) => {
  try {
    const userId = req.user.id; // from JWT middleware

    const user = await User.findById(userId).populate("team");
    if (!user || !user.team) {
      return res.status(404).json({ message: "Team not found" });
    }

    const membersCount = await User.countDocuments({ team: user.team._id });

    res.json({
      teamName: user.team.name,
      adminName: user.name,
      email: user.email,
      membersCount,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
