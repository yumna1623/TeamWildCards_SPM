import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  team: { type: mongoose.Schema.Types.ObjectId, ref: "Team", required: true },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const Department = mongoose.model("Department", departmentSchema);
export default Department;
