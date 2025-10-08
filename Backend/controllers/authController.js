import User from "../models/User.js";
import Team from "../models/Team.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};


// ------------------------------------------------------------ LOGIN (Admin or Member)
export const loginWithPasscode = async (req, res) => {
  try {
    const { email, passcode } = req.body;
    console.log("👉 Incoming login:", { email, passcode });

    const user = await User.findOne({ email }).populate("team");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let isMatch = false;

    if (user.role === "admin") {
      isMatch = await bcrypt.compare(passcode, user.password);
    } else if (user.role === "member" && user.team && user.team.passcode) {
      isMatch = await bcrypt.compare(passcode, user.team.passcode);
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
