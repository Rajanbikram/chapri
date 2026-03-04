import express from "express";
import { getAllUsers, blockUser, unblockUser } from "../../Controller/owner/ownerUserController.js";
import { verifyToken } from "../../middleware/auth/authMiddleware.js";

const router = express.Router();
router.get("/", verifyToken, getAllUsers);
router.put("/:id/block", verifyToken, blockUser);
router.put("/:id/unblock", verifyToken, unblockUser);

export default router;