import express from "express";
import {
  deleteUser,
  getAll,
  getAllUser,
  getFeedback,
  getGigs,
  getLawyer,
  verifyLawyer,
} from "../controllers/admin.controller.js";
import { verifyTokenAdmin } from "../middleware/jwt.js";

const router = express.Router();

router.get("/lawyers", verifyTokenAdmin, getLawyer);
router.get("/gigs", verifyTokenAdmin, getGigs);
router.post("/verify", verifyTokenAdmin, verifyLawyer);
router.get("/lawyerz", verifyTokenAdmin, getAll);
router.get("/userz", verifyTokenAdmin, getAllUser);
router.delete("/deleteAcc", verifyTokenAdmin, deleteUser);
router.get("/feedbacks", verifyTokenAdmin, getFeedback);

export default router;
