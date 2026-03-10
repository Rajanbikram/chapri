import express from "express";
import { getOwnerStats } from "../../Controller/owner/ownerOverviewController.js";
import { verifyToken } from "../../middleware/auth/authMiddleware.js";

const router = express.Router();

router.get("/stats", verifyToken, getOwnerStats);

export default router;