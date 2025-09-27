import User from "../models/User.js";
import jwt from "jsonwebtoken";

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
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    res.json({
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        team: user.team, // ✅ make sure this is sent
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
