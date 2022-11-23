import express from "express";
const router = express.Router();

import { validateCreateUser, validateCreationToken } from "../validators/user";
import { createUser } from "../controllers/user";

router.post("/", validateCreationToken, validateCreateUser, createUser);