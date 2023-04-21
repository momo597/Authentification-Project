import express from "express";
import {
  healthOfficerRegister,
  login,
  passwordReset,
  patientRegister,
} from "../controllers/auth.js";

const router = express.Router();

router.patch("/password-reset", passwordReset);
router.post("/health-officer-register", healthOfficerRegister);
router.post("/doctor-register", healthOfficerRegister);
router.post("/patient-register", patientRegister);
router.post("/login", login);

export default router;
