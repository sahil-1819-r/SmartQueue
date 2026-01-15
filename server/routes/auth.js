import express from "express";
const router = express.Router();
import auth  from "../middlewares/auth.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import { login, signup, getMe } from "../controllers/auth.controller.js";

router.post("/login", asyncHandler(login));

router.post("/signup", asyncHandler(signup));

router.get("/me", auth, asyncHandler(getMe));

export default router;
