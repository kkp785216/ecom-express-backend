import express from 'express';
import { getProfile } from '../controller/userCtrl';

const router = express.Router();

// request and route for get user Profile
router.get("/profile", getProfile);

export default router;