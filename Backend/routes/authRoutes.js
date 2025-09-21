import express from "express";
import { loginUser, registerUser, loginWithPasscode } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser); // standard email/password
router.post("/login-passcode", loginWithPasscode); // email + team passcode

export default router;
