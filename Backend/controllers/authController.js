import User from "../models/User.js";
import Team from "../models/Team.js";
import jwt from "jsonwebtoken";

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// Register user
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ name, email, password, role });
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login user (standard email/password)
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login with passcode
export const loginWithPasscode = async (req, res) => {
  const { email, passcode } = req.body;

  try {
    const user = await User.findOne({ email }).populate("team");
    if (!user) return res.status(400).json({ message: "User not found" });

    if (!user.team) return res.status(400).json({ message: "User not assigned to a team" });

    if (user.team.passcode !== passcode)
      return res.status(400).json({ message: "Invalid team passcode" });

    const token = generateToken(user._id);

    res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        team: { _id: user.team._id, name: user.team.name },
      },
      token,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
