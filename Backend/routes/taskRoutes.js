// backend/routes/taskRoutes.js
import express from "express";
import {
  createTask,
  getMyTasks,
  updateTaskStatus,
  
} from "../controllers/taskController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Only admin can create a task
router.post("/", protect, createTask);


// ✅ Members update their task status
router.put("/:id", protect, updateTaskStatus);

router.get("/my", protect, getMyTasks);

// ✅ Both admin & members can fetch tasks (filtered in controller)
router.get("/", protect, getMyTasks);


// User updates task status
router.put("/:id/status", protect, updateTaskStatus);

export default router;
