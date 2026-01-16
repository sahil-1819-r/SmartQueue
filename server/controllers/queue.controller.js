import Ticket from "../models/ticket.js";
import Queue from "../models/queue.js";
import { CustomError } from "../middlewares/CustomError.js";

export const hub = async (req, res) => {
  let hub = await Queue.find();
  res.status(200).json(hub);
};

export const createQueue = async (req, res) => {
  let { name, startAt, endAt } = req.body;
  console.log(req.user);
  let queue = await Queue.create({
    name,
    startAt,
    endAt,
  });
  res.status(201).json(queue);
};

export const showTickets = async (req, res) => {
  let { queueId } = req.params;

  let queue = await Ticket.find({ queueId });
  res.status(200).json(queue);
};

export const joinQueue = async (req, res) => {
  let { queueId } = req.params;
  console.log(req.user);
  let userId = req.user.id;
  console.log("queueId:",queueId);
  let queue = await Queue.findById({ _id: queueId });
  console.log("service:", queue);
  if (!queue || !queue.isActive) {
    console.log("queue not active");
    throw new CustomError(400, "Queue is not Active");
  }

  let alreadyJoined = await Ticket.findOne({
    queueId,
    userId,
  });
  console.log("alreadyJoined:", alreadyJoined);
  if (alreadyJoined) {
    throw new CustomError(400, "already joined");
  }
  let length = await Ticket.countDocuments({ queueId });
  let ticket = await Ticket.create({
    queueId,
    userId,
    position: length + 1,
  });
  await ticket.save();
  res.status(201).json(ticket);
};
