import express from "express";
const router = express.Router();
import asyncHandler from "../middlewares/asyncHandler.js";
import auth from "../middlewares/auth.js";
import {
  showTickets,
  joinQueue,
  hub,
  createQueue,
} from "../controllers/queue.controller.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.js";

router.get("/hub", auth, authorizeRoles(["user", "admin"]), asyncHandler(hub));

router.post(
  "/queue",
  auth,
  authorizeRoles(["admin"]),
  asyncHandler(createQueue)
);

router.get(
  "/queue/:queueId",
  auth,
  authorizeRoles(["user", "admin"]),
  asyncHandler(showTickets)
);

router.post(
  "/queue/:queueId/join",
  auth,
  authorizeRoles(["user"]),
  asyncHandler(joinQueue)
);

export default router;
