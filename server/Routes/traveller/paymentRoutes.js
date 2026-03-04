import express from "express";
import { createPayment } from "../../Controller/traveller/paymentController.js";
import { verifyToken } from "../../middleware/auth/authMiddleware.js";

const router = express.Router();

router.post("/", verifyToken, createPayment);

export default router;