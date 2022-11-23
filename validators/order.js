import Joi from "joi";

import { requiredString, verifyBody, verifyQuery } from "./common.js";

const createOrderSchema = {
    vehicleId: requiredString,
    helmet: Joi.boolean().default(false),
    from: Joi.date().required(),
    to: Joi.date().required().min(Joi.ref('from')),
    pickup: requiredString,
    drop: requiredString
}

const getOrdersSchema = {
    vehicleId: requiredString,
    customerId: requiredString,
    orderedOn: Joi.date(),
    bookedTill: Joi.date()
}

export const validateCreateOrder = (...args) => verifyBody(args, createOrderSchema);
export const validateGetOrders = (...args) => verifyQuery(args, getOrdersSchema);