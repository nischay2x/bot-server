import Joi from "joi";
import jwt from "jsonwebtoken";
import { keys } from "../constant";
import { errorHandler, ValidationError } from "../errors";

export const requiredContact = Joi.string().min(10).max(10).regex(/^\d+$/).required();
export const requiredString = Joi.string().required().min(1);

export function verifyBody(args, schema) {
    const [req, res, next] = args;
    try {
        const { error, value } = Joi.object().keys(schema).validate(req.body);
        if (error) throw new ValidationError(error.message);

        req.body = value;
        next();
    } catch (error) {
        errorHandler(error, res);
    }
}

export function verifyQuery(args, schema) {
    const [req, res, next] = args;
    try {
        const { error, value } = Joi.object().keys(schema).validate(req.query);
        if (error) throw new ValidationError(error.message);

        req.query = value;
        next();
    } catch (error) {
        errorHandler(error, res);
    }
}

export function validateAccessToken(req, res) {
    try {
        const authHeader = req.headers['authorization'];
        if(!authHeader) throw new ValidationError("Access Token Missing");

        const authToken = authHeader.split(" ")[1];
        if(!authToken) throw new ValidationError("Access Token Missing");

        jwt.verify(authToken, keys.ACCESS_SECRET, (err, user) => {
            if(err) throw new ValidationError(err.message);

            req.user = user;
            next();
        })
    } catch (error) {
        errorHandler(error, res)
    }
}