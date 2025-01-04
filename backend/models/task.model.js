import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["In-Progress", "Done"],
      default: "In-Progress",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  });
  
  export const Task = mongoose.model("Task", taskSchema);
  