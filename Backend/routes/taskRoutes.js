// import express from "express";
// import protect from "../middleware/authMiddleware.js";
// import { createTask, getTasks } from "../controllers/taskController.js";

// const router = express.Router();
// router.post("/", protect, createTask);
// router.get("/", protect, getTasks);

// export default router;
import express from "express";
import { createTask, getTasks, updateTaskStatus } from "../controllers/taskController.js";
import protect from "../middleware/authMiddleware.js";


const router = express.Router();

// Admin creates a task
router.post("/", protect, createTask);

// User fetches tasks assigned to them
router.get("/", protect, getTasks);

// User updates task status
router.put("/:id", protect, updateTaskStatus);

export default router;
