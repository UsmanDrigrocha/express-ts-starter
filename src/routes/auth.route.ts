import express from "express";
import * as authController from "../controllers/auth.controller";
import verifyToken from "../middleware/tokenChecker";

const router = express.Router();

router.post("/register", authController.register);

export default router;
