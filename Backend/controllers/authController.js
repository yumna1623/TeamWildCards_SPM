import User from "../models/User.js";
import Team from "../models/Team.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// ------------------------------------------------------------ LOGIN (Team-based)
export const loginWithPasscode = async (req, res) => {
  try {
    const { email, passcode } = req.body;
    console.log("👉 Incoming login:", { email, passcode });

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let isMatch = false;

    if (user.role === "admin") {
      // Compare passcode with admin's password
      isMatch = await bcrypt.compare(passcode, user.password);
    } 
    else if (user.role === "member" && user.team) {
      // Fetch team separately to get the real passcode hash
      const team = await Team.findById(user.team);
      if (!team) {
        return res.status(404).json({ message: "Team not found" });
      }
      isMatch = await bcrypt.compare(passcode, team.passcode);
    }

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id);
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        team: user.team || null,
      },
    });
  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

