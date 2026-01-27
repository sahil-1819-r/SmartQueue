import express from "express";
const router = express.Router();
import asyncHandler from "../middlewares/asyncHandler.js";
import auth from "../middlewares/auth.js";
import {
  joinQueue,
  hub,
  createQueue,
  showQueue,
  leaveQueue,
} from "../controllers/queue.controller.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.js";

router.get("/hub", auth, authorizeRoles(["user", "admin"]), asyncHandler(hub));

router.post(
  "/queue",
  auth,
  authorizeRoles(["admin"]),
  asyncHandler(createQueue),
);


router
  .route("/queue/:queueId")
  .get(auth, authorizeRoles(["user", "admin"]), asyncHandler(showQueue))
  .post(auth, authorizeRoles(["user", "admin"]), asyncHandler(joinQueue))
  .patch(auth, authorizeRoles(["user", "admin"]), asyncHandler(leaveQueue));

export default router;
