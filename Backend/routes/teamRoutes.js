import express from "express";
import { createTeam, joinTeam, getTeamDashboard } from "../controllers/teamController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// POST /api/team/create
router.post("/create", createTeam);

// POST /api/team/join
router.post("/join", joinTeam);

// GET /api/team/dashboard
router.get("/dashboard", authMiddleware, getTeamDashboard);

export default router;


