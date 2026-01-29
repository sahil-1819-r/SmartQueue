import express from "express";
import auth from "../middlewares/auth.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import { createOrg, getAllOrgs } from "../controllers/org.controller.js";
const router = express.Router();

router.post("/org", auth, authorizeRoles(["admin"]), asyncHandler(createOrg));

router.get("/org", auth, authorizeRoles(["admin"]), asyncHandler(getAllOrgs));

export default router;
