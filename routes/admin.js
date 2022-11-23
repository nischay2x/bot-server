import express from "express";
const router = express.Router();

import { changePassword, createExecutiveAdmin, deleteAdmin, login } from "../controllers/admin";
import { 
    valdiateAdminLogin, validateAdminAccessToken, validateChangePassword, 
    validateCreateExecutive, validateSuperAdminAccessToken 
} from "../validators/admin";

router.post("/login", valdiateAdminLogin, login);

router.patch("/password", validateAdminAccessToken, validateChangePassword, changePassword);

router.use(validateSuperAdminAccessToken);
router.post("/exec", validateCreateExecutive, createExecutiveAdmin);
router.delete("/exec/:id", deleteAdmin);