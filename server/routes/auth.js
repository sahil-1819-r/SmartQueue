import express from "express";
const router = express.Router();
import asyncHandler from "../middlewares/asyncHandler.js";
import { login, signup } from "../controllers/auth.controller.js";

router.post("/login", asyncHandler(login));

router.post("/signup", asyncHandler(signup));

export default router;
