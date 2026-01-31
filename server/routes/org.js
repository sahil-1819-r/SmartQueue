import express from "express";
import auth from "../middlewares/auth.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import {
  createOrg,
  getMyOrg,
  getQueues,
} from "../controllers/org.controller.js";
const router = express.Router();

router.post("/org", auth, authorizeRoles(["admin"]), asyncHandler(createOrg));

router.get("/org/me", auth, authorizeRoles(["admin"]), asyncHandler(getMyOrg));
router.get(
  "/org/me/queues",
  auth,
  authorizeRoles(["admin"]),
  asyncHandler(getQueues),
);

export default router;
