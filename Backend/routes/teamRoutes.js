import express from "express";
import { joinTeam, getTeamDashboard } from "../controllers/teamController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// POST /api/team/join
router.post("/join", joinTeam);

// GET /api/team/dashboard
router.get("/dashboard", authMiddleware, getTeamDashboard);

export default router;
