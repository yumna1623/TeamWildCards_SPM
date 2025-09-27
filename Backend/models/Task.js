import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  status: { type: String, enum: ["todo", "in-progress", "done"], default: "todo" },
  priority: { type: String, enum: ["low", "medium", "high"], default: "medium" },
  dueDate: Date,
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  team: { type: mongoose.Schema.Types.ObjectId, ref: "Team", required: true },
  department: { type: mongoose.Schema.Types.ObjectId, ref: "Department" } // 👈 NEW
}, { timestamps: true });

const Task = mongoose.model("Task", taskSchema);
export default Task;
