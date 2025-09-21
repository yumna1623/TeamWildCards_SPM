import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  passcode: { type: String, required: true }, // will be stored as plain for now
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
}, { timestamps: true });

const Team = mongoose.model("Team", teamSchema);
export default Team;
