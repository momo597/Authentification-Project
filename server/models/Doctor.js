import mongoose from "mongoose";
import User from "./User.js";

const doctorSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  workLocation: {
    type: String,
    required: true,
  },
});

const Doctor = User.discriminator("Doctor", doctorSchema);

export default Doctor;
