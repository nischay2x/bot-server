import express from "express";
const router = express.Router();

import { refreshAccessToken, sendOtp, verifyOtp } from "../controllers/auth";
import { validateRefreshAccessToken, validateSendOtp, validateVerifyOtp } from "../validators/auth";

router.post("/send-otp", validateSendOtp, sendOtp);
router.post("/verify-otp", validateVerifyOtp, verifyOtp);
router.get("/access", validateRefreshAccessToken, refreshAccessToken);
