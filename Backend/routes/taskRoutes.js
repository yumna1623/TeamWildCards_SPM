import express from "express";
import protect from "../middleware/authMiddleware.js";
import { createTask, getTasks } from "../controllers/taskController.js";

const router = express.Router();
router.post("/", protect, createTask);
router.get("/", protect, getTasks);

export default router;
