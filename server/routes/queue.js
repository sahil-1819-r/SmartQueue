import express from "express";
const router = express.Router();
import Service from "../models/service.js";
import Ticket from "../models/ticket.js";

router.get("/hub",async(req,res)=>{
    let hub = await Service.find();
    console.log("services: ", hub);
    res.status(200).json(hub);
});

router.post("/queue", async (req, res) => {
  let { name, startAt, endAt } = req.body;

  let service = await Service.create({
    name,
    startAt,
    endAt,
  });
  await service.save();
  res.status(201).json(service);
});

router.get("/queue/:queueId", async (req, res) => {
  let { queueId } = req.params;

  let queue = await Ticket.find({ queueId });
  res.status(200).json(queue);
});

router.post("/queue/:queueId/join", async (req, res) => {
  let { queueId } = req.params;
  let { userId } = req.body;

  let service = await Service.findById({ "_id":queueId });
  console.log("service:", service);
  if (!service || !service.isActive) {
    console.log("queue not active");
    res.status(400).json("Queue is not Active");
  }

  let alreadyJoined = await Ticket.findOne({
    queueId,
    userId,
  });
  console.log("alreadyJoined:", alreadyJoined);
  if (alreadyJoined) {
    res.status(400).json({ err: "already joined" });
  }
  let length = await Ticket.countDocuments({ queueId });
  let ticket = await Ticket.create({
    queueId,
    userId,
    position: length + 1,
  });
  res.status(201).json(ticket);
});

export default router;
