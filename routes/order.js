import express from "express";
const router = express.Router();

import { validateCreateOrder, validateGetOrders } from "../validators/order";
import { cancelOrder, confirmOrder, createOrder, getOrderById, getOrders } from "../controllers/order";
import { validateAccessToken } from "../validators/common";
import { validateSuperAdminAccessToken } from "../validators/admin";


router.post("/", validateAccessToken, validateCreateOrder, createOrder);

router.get("/", validateSuperAdminAccessToken, validateGetOrders, getOrders);
router.get("/:id", validateSuperAdminAccessToken, getOrderById);
router.patch("/confirm/:id", validateSuperAdminAccessToken, confirmOrder);
router.patch("/cancel/:id", validateAccessToken, cancelOrder);