import mongoose from "mongoose";

const baseOptions = {
  discriminatorKey: "user",
  timestamps: true,
};

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      min: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 8,
    },
  },
  {
    baseOptions,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
