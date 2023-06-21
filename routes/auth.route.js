import express from "express";
import {
  changePassword,
  loginAdmin,
  logoutAdmin,
  registerAdmin,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/registerAdmin", registerAdmin);

router.post("/loginAdmin", loginAdmin);

router.get("/logoutAdmin", logoutAdmin);

router.post("/changePassword", changePassword);

export default router;
