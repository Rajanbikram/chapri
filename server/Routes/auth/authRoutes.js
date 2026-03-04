import express from "express";
import { register, login, getMe } from "../../Controller/auth/authController.js";
import { verifyToken } from "../../middleware/auth/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", verifyToken, getMe);

export default router;