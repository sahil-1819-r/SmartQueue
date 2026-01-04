import express from "express";
const router = express.Router();
import asyncHandler from "../middlewares/asyncHandler.js";
import auth from '../middlewares/auth.js'
import {
  createService,
  showTickets,
  joinQueue,
  hub,
} from "../controllers/queue.controller.js";

router.get("/hub", auth,asyncHandler(hub));

router.post("/queue", asyncHandler(createService));

router.get("/queue/:queueId", asyncHandler(showTickets));

router.post("/queue/:queueId/join", asyncHandler(joinQueue));

export default router;
