import mongoose from "mongoose";
import User from "./User.js";

const healthWorkerSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  workLocation: {
    type: String,
    required: true,
  },
});

const HealthWorker = User.discriminator("HealthWorker", healthWorkerSchema);

export default HealthWorker;
