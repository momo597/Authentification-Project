import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Doctor from "../models/Doctor.js";
import HealthWorker from "../models/HealthOfficer.js";
import Patient from "../models/Patient.js";
import User from "../models/User.js";

/* REGISTER HEALTH WORKER OR DOCTOR*/
export const healthOfficerRegister = async (req, res) => {
  try {
    const { firstName, lastName, email, password, id, workLocation, userType } =
      req.body;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    let newUser;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !id ||
      !workLocation
    ) {
      res.status(400).json({ message: "Missing field" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.json({
        message:
          "This email is already used. Please choose a different email address.",
        email,
      });
      return;
    }

    if (userType === "Doctor") {
      newUser = new Doctor({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        id,
        workLocation,
      });
    } else {
      newUser = new HealthWorker({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        id,
        workLocation,
      });
    }

    const savedUser = await newUser.save();

    return res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* REGISTER PATIENT */
export const patientRegister = async (req, res) => {
  try {
    const { firstName, lastName, email, password, postalCode, phoneNumber } =
      req.body;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    let newUser;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !postalCode ||
      !phoneNumber
    ) {
      res.status(400).json({ message: "Missing field" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.json({
        message:
          "This email is already used. Please choose a different email address.",
      });
      return;
    }

    newUser = new Patient({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      postalCode,
      phoneNumber,
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* LOGIN */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ message: "User does not exist" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid Password" });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* RESET PASSWORD */
export const passwordReset = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Missing Fields" });

    const salt = await bcrypt.genSalt();
    const newPassword = await bcrypt.hash(password, salt);

    const updatedUser = await User.findOneAndUpdate(
      { email: email },
      { password: newPassword }
    );

    if (!updatedUser)
      return res
        .status(400)
        .json({ message: "There's no users linked with this email address" });

    return res.status(200).json(updatedUser);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};
