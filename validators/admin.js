import Joi from "joi";
import jwt from "jsonwebtoken";
import { keys } from "../constant.js";
import ValidationError from "../errors/ValidationError.js";
import { requiredContact, requiredString, verifyBody } from "./common.js";

const adminLoginSchema = {
    mobile: requiredContact,
    password: requiredString
}

const changePasswordSchema = {
    oldPassword: requiredString,
    newPassword: requiredString
}

const createExecutiveSchema = {
    email: Joi.string().email(),
    mobile: requiredContact,
    password: requiredString,
    name: requiredString
}

export function validateAdminAccessToken(req, res) {
    try {
        const authHeader = req.headers['authorization'];
        if(!authHeader) throw new ValidationError("Admin Token Missing");

        const authToken = authHeader.split(" ")[1];
        if(!authToken) throw new ValidationError("Admin Token Missing");

        jwt.verify(authToken, keys.ADMIN_TOKEN, (err, user) => {
            if(err) throw new ValidationError(err.message);

            req.user = user;
            next();
        })
    } catch (error) {
        errorHandler(error, res)
    }
}

export function validateSuperAdminAccessToken (req, res) {
    try {
        const authHeader = req.headers['authorization'];
        if(!authHeader) throw new ValidationError("Admin Token Missing");

        const authToken = authHeader.split(" ")[1];
        if(!authToken) throw new ValidationError("Admin Token Missing");

        jwt.verify(authToken, keys.ADMIN_TOKEN, (err, user) => {
            if(err) throw new ValidationError(err.message);
            if(user.type !== "SUPER-ADMIN") throw new ValidationError("Allowed to Super Admin Only");

            req.user = user;
            next();
        })
    } catch (error) {
        errorHandler(error, res)
    }
}

export const valdiateAdminLogin = (...args) => verifyBody(args, adminLoginSchema);
export const validateChangePassword = (...args) => verifyBody(args, changePasswordSchema);
export const validateCreateExecutive = (...args) => verifyBody(args, createExecutiveSchema);