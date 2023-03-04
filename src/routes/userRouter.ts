import express from 'express';
import { deleteProfile, getProfile } from '../controller/userCtrl';

const router = express.Router();

// request and route for get user Profile
router.get("/profile", getProfile);

// request and route for login existing user
router.delete("/profile", deleteProfile);

export default router;