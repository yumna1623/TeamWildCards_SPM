import express from "express";
import { createTeam, joinTeam, getTeamsByAdmin } from "../controllers/adminController.js";

const router = express.Router();

// POST /api/admin/create-team
router.post("/create-team", createTeam);

// POST /api/admin/join-team
router.post("/join-team", joinTeam);

// GET /api/admin/teams/:adminId
router.get("/teams/:adminId", getTeamsByAdmin);

export default router;
