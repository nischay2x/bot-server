import express from "express";
const router = express.Router();

import { validateCreateVehicle, validateGetVehicles, validateUpdateVehicle } from "../validators/vehicle";
import { createVehicle, deleteVehicle, getVehicles, updateVehicleData, updateVehicleImage } from "../controllers/vehicle";
import { validateSuperAdminAccessToken } from "../validators/admin";

router.use(validateSuperAdminAccessToken);
router.post("/", validateCreateVehicle, createVehicle);
router.patch("/:id", validateUpdateVehicle, updateVehicleData);
router.patch("/image/:id", updateVehicleImage);
router.delete("/:id", deleteVehicle);
router.get("/", validateGetVehicles, getVehicles);
