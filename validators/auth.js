import Joi from "joi";

import { errorHandler, ValidationError } from "../errors/index.js";

import { requiredContact, verifyBody } from "./common.js";

const sendOtpSchema = {
    mobile: requiredContact
}

const verifyOtpSchema = {
    mobile: requiredContact,
    otp: Joi.string().min(6).regex(/^\d+$/).required()
}

export function validateRefreshAccessToken (req, res, next) {
    try {
        const refreshToken = req.headers["x-refresh-token"];
        if(!refreshToken) throw new ValidationError("Refresh Token Missing");
    
        next();
    } catch (error) { errorHandler(error, res); }
}

export const validateSendOtp = (...args) => verifyBody(args, sendOtpSchema);
export const validateVerifyOtp = (...args) => verifyBody(args, verifyOtpSchema);