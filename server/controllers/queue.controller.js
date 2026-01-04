import Ticket from "../models/ticket.js";
import Service from "../models/service.js";
import { CustomError } from "../middlewares/CustomError.js";

export const hub = async (req, res) => {
  let hub = await Service.find();
  console.log("services: ", hub);
  res.status(200).json(hub);
};

export const  createService = async (req, res) => {
  let { name, startAt, endAt } = req.body;

  let service = await Service.create({
    name,
    startAt,
    endAt,
  });
  await service.save();
  res.status(201).json(service);
};

export const showTickets = async (req, res) => {
  let { queueId } = req.params;

  let queue = await Ticket.find({ queueId });
  res.status(200).json(queue);
};

export const joinQueue = async (req, res) => {
  let { queueId } = req.params;
  let { userId } = req.body;

  let service = await Service.findById({ _id: queueId });
  console.log("service:", service);
  if (!service || !service.isActive) {
    console.log("queue not active");
    throw new CustomError(400,"Queue is not Active")
  }

  let alreadyJoined = await Ticket.findOne({
    queueId,
    userId,
  });
  console.log("alreadyJoined:", alreadyJoined);
  if (alreadyJoined) {
    throw new CustomError(400,"already joined")
  }
  let length = await Ticket.countDocuments({ queueId });
  let ticket = await Ticket.create({
    queueId,
    userId,
    position: length + 1,
  });
  res.status(201).json(ticket);
};
