// // backend/models/Task.js
// import mongoose from "mongoose";

// const taskSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   description: String,
//   memberName: String,
//   memberEmail: String,
//   deadline: Date,
//   priority: { type: String, enum: ["High", "Medium", "Low"], default: "Medium" },
//   department: { type: mongoose.Schema.Types.ObjectId, ref: "Department" },
//   status: { type: String, enum: ["Pending", "In Progress", "Done"], default: "Pending" },
//   createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
// }, { timestamps: true });

// export default mongoose.model("Task", taskSchema);
// backend/models/Task.js
import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    memberName: String,
    memberEmail: String,
    deadline: Date,
    priority: {
      type: String,
      enum: ["High", "Medium", "Low"],
      default: "Medium",
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
    },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Done"],
      default: "Pending",
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    // 🔑 New fields
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    team: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskSchema);
