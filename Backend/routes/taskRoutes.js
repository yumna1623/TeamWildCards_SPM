// backend/routes/taskRoutes.js
import express from "express";
import {
  createTask,
  getTasks,
  updateTaskStatus,
} from "../controllers/taskController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Only admin can create a task
router.post("/", protect, createTask);

// ✅ Both admin & members can fetch tasks (filtered in controller)
router.get("/", protect, getTasks);

// ✅ Members update their task status
router.put("/:id", protect, updateTaskStatus);

export default router;
