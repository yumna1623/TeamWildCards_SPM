import Team from "../models/Team.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// ------------------------------------------------------ Create Team (Admin)
export const createTeam = async (req, res) => {
  const { teamName, leaderName, email, password, passcode } = req.body;

  try {
    // 1. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 2. Create admin user
    const adminUser = await User.create({
      name: leaderName,
      email,
      password,
      role: "admin",
    });

    if (!adminUser) {
      return res.status(500).json({ message: "Failed to create admin user" });
    }

    // 3. Create team
    const team = await Team.create({
      name: teamName,
      passcode,
      leader: adminUser._id,
      members: [adminUser._id],
    });

    // 4. Link admin to team
    adminUser.team = team._id;
    await adminUser.save();

    // 5. Respond
   res.status(201).json({
  message: "✅ Team created successfully",
  token: generateToken(adminUser._id),
  team,
  user: {   // ✅ consistent with joinTeam & login
    id: adminUser._id,
    name: adminUser.name,
    email: adminUser.email,
    role: adminUser.role,
    team: adminUser.team,   // ✅ send team id
  },
});

  } catch (err) {
    console.error("❌ Error creating team:", err);
    res.status(500).json({ message: err.message });
  }
};


// ---------------------------------------------------------------Join Team
// ----------------- Join Team (Member)
export const joinTeam = async (req, res) => {
  const { name, email, password, passcode } = req.body;

  try {
    const team = await Team.findOne({ passcode });
    if (!team) return res.status(404).json({ message: "Team not found" });

    // Create user with their own password
    const user = await User.create({
      name,
      email,
      password,  // ✅ hashed by model
      role: "member",
      team: team._id,
    });

    team.members.push(user._id);
    await team.save();

    res.json({
      message: "Joined team successfully",
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        team: team._id,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// -------------------------------------------------------- Get Admin Dashboard Info
export const getAdminDashboard = async (req, res) => {
  try {
    // req.user is set from JWT middleware
    const admin = await User.findById(req.user.id);

    if (!admin || admin.role !== "admin") {
      return res.status(403).json({ message: "Not authorized as admin" });
    }

    const team = await Team.findById(admin.team)
      .populate("leader", "name email")
      .populate("members", "name email");

    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    res.json({
      teamName: team.name,
      leader: team.leader,
      totalMembers: team.members.length,
      members: team.members,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
