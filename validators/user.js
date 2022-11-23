import Joi from "joi";
import jwt from "jsonwebtoken";
import ValidationError from "../errors/ValidationError.js";

import { keys } from "../constant.js";

import { requiredString, verifyBody } from "./common.js";

const createUserSchema = {
    name: requiredString,
    email: Joi.string().email().required(),
    dob: Joi.date().required()
};

export function validateCreationToken(req, res) {
    try {
        const creationToken = req.headers['x-creation-token']; 
        if(!creationToken) throw new ValidationError("Creation Token Missing");

        jwt.verify(creationToken, keys.CREATION_TOKEN, (err, data) => {
            if(err) throw new ValidationError(err.message);

            req.create = data;
            next();
        })
    } catch (error) {
        errorHandler(error, res)
    }
}

export const validateCreateUser = (...args) => verifyBody(args, createUserSchema);
