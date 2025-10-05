import User from "../models/User.js";
import Team from "../models/Team.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// ------------------------------------------------------------ Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// ------------------------------------------------------------ Register User
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // 1. Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 2. Create new user
    user = await User.create({ name, email, password });

    // 3. Return JWT + user info
    res.status(201).json({
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        team: user.team, // ✅ include team here too
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ------------------------------------------------------------ Login User




export const loginWithPasscode = async (req, res) => {
  try {
    const { email, passcode } = req.body;
    console.log("👉 Incoming login:", { email, passcode });

    // Find user by email
    const user = await User.findOne({ email }).populate("team");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let isMatch = false;

    if (user.role === "admin") {
      // ✅ Admin: compare with password
      isMatch = await bcrypt.compare(passcode, user.password);
    } else {
      // ✅ Member: compare with team passcode (stored in Team collection)
      if (user.team && user.team.passcode) {
        isMatch = await bcrypt.compare(passcode, user.team.passcode);
      }
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
        team: user.team ? user.team._id : null,
      },
    });
  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


