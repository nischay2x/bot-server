import Joi from "joi";

import { requiredString, verifyBody, verifyQuery } from "./common.js";

const createVehicleSchema = {
    name: requiredString,
    brand: requiredString,
    hourPrice: Joi.number().required().min(1),
    dayPrice: Joi.number().required().min(1),
    number: requiredString
}

const updateVehicleDataSchema = {
    name: Joi.string(),
    brand: Joi.string(),
    hourPrice: Joi.number(),
    dayPrice: Joi.number(),
    number: Joi.string(),
    bookedTill: Joi.date(),
    isAvailable: Joi.boolean()
}

const getVehiclesSchema = {
    brand: Joi.string(),
    sort: Joi.string(),
    name: Joi.string(),
    number: Joi.string(),
    isAvailable: Joi.boolean(),
    limit: Joi.number(),
    offset: Joi.number()
}

export const validateCreateVehicle = (...args) => verifyBody(args, createVehicleSchema);
export const validateUpdateVehicle = (...args) => verifyBody(args, updateVehicleDataSchema);
export const validateGetVehicles = (...args) => verifyQuery(args, getVehiclesSchema);