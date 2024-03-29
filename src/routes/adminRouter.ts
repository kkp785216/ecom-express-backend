import express from "express";
import {
  deleteProfile,
  getProfile,
  updateProfile,
} from "../controller/adminCtrl";
import { authMiddleware, isAdmin } from "../middlewares/authMiddleware";

const router = express.Router();

// request and route for get user Profile
router.get("/profile/:id", authMiddleware, isAdmin, getProfile);

// request and route for delete user profile
router.delete("/profile/:id", authMiddleware, isAdmin, deleteProfile);

// request and route for update user profile
router.put("/profile/:id", authMiddleware, isAdmin, updateProfile);

export default router;
