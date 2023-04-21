import mongoose from "mongoose";
import User from "./User.js";

const patientSchema = new mongoose.Schema({
  postalCode: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
});

const Patient = User.discriminator("Patient", patientSchema);

export default Patient;
