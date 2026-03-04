import express from "express";
import { updateSchedule } from "../../Controller/owner/ownerScheduleController.js";
import { verifyToken } from "../../middleware/auth/authMiddleware.js";

const router = express.Router();
router.put("/:id/schedule", verifyToken, updateSchedule);

export default router;