import express from "express";
import { updatePrice } from "../../Controller/owner/ownerPricingController.js";
import { verifyToken } from "../../middleware/auth/authMiddleware.js";

const router = express.Router();
router.put("/:id/price", verifyToken, updatePrice);

export default router;