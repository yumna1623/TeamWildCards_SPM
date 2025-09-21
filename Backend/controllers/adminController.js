import User from "../models/User.js";
import Team from "../models/Team.js";
import jwt from "jsonwebtoken";

// Create team + admin
export const createTeam = async (req, res) => {
  const { leaderName, email, password, teamName, passcode } = req.body;

  try {
    // Check if team exists
    const existingTeam = await Team.findOne({ name: teamName });
    if (existingTeam) {
      return res.status(400).json({ message: "Team name already exists" });
    }

    // Check if email exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User with this email already exists" });
    }

    // Create admin user
    user = new User({
      name: leaderName,
      email,
      password:passcode,   // will be hashed by schema
      role: "admin",
    });
    await user.save();

    // Create team
    const team = new Team({
      name: teamName,
      passcode,
      email,
      createdBy: user._id,
      members: [user._id],
    });
    await team.save();

    // Update user's teams
    user.teams.push(team._id);
    await user.save();

    // Issue token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.status(201).json({
      message: "Team and admin created successfully",
      admin: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      team,
      token,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Join a team using passcode
export const joinTeam = async (req, res) => {
  const { userId, teamName, passcode } = req.body;

  try {
    const team = await Team.findOne({ name: teamName });
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    if (team.passcode !== passcode) {
      return res.status(400).json({ message: "Invalid passcode" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Add user to team if not already a member
    if (!team.members.includes(user._id)) {
      team.members.push(user._id);
      await team.save();
    }

    // Add team to user's teams if not already
    if (!user.teams.includes(team._id)) {
      user.teams.push(team._id);
      await user.save();
    }

    res.status(200).json({ message: "Joined team successfully", team });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get teams by admin
export const getTeamsByAdmin = async (req, res) => {
  try {
    const teams = await Team.find({ createdBy: req.params.adminId }).populate("members", "name email");
    res.json(teams);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
