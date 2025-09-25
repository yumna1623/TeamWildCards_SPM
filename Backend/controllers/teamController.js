// controllers/teamController.js
import User from "../models/User.js";
import Team from "../models/Team.js";
import jwt from "jsonwebtoken";

export const createTeam = async (req, res) => {
  const { teamName, leaderName, email, passcode } = req.body;

  try {
    // Check if team exists
    const existingTeam = await Team.findOne({ name: teamName });
    if (existingTeam) {
      return res.status(400).json({ message: "Team name already exists" });
    }

    // Check if leader exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User with this email already exists" });
    }

    // Create admin user
    user = new User({
      name: leaderName,
      email,
      password: passcode, // hashes automatically
      role: "admin",
    });
    await user.save();

    // Create team
    const team = new Team({
      name: teamName,
      passcode,
      leaderName,
      createdBy: user._id,
      members: [user._id],
    });
    await team.save();

    // Assign team to leader
    user.team = team._id;
    await user.save();

    // Generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.status(201).json({
      message: "✅ Team created successfully",
      team,
      token,
    });
  } catch (err) {
    console.error("Error in createTeam:", err);
    res.status(500).json({ message: err.message });
  }
};
