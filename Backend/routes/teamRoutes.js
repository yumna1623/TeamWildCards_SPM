import express from "express";
import protect from "../middleware/authMiddleware.js";
import { createTeam, getAdminDashboard, joinTeam } from "../controllers/teamController.js";
import { getUserDashboard } from "../controllers/userController.js";

const router = express.Router();

router.post("/create", createTeam);
router.post("/join", joinTeam);
router.get("/admin-dashboard", protect, getAdminDashboard); // ✅ protect added
router.get("/user-dashboard", protect, getUserDashboard);


export default router;
