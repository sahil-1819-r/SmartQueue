import Ticket from "../models/ticket.js";
import Queue from "../models/queue.js";
import { CustomError } from "../middlewares/CustomError.js";
import Service from "../models/queue.js";
import Organisation from '../models/organisation.js'
export const hub = async (req, res) => {
  let hub = await Queue.find();
  res.status(200).json(hub);
};

export const createQueue = async (req, res) => {
  let { name, startAt, endAt } = req.body;
  const userId = req.userId;
  const org = await Organisation.findOne({userId});
  const orgId = org._id;
  console.log(req.user);
  let queue = await Queue.create({
    name,
    startAt,
    endAt,
    orgId
  });
  res.status(201).json(queue);
};

export const showQueue = async (req, res) => {
  let { queueId } = req.params;
  const queue = await Service.findById({ _id: queueId });
  const tickets = await Ticket.find({ queueId });
  res.status(200).json({ info: queue, tickets: tickets });
};

export const joinQueue = async (req, res) => {
  let { queueId } = req.params;
  let userId = req.userId;
  let queue = await Queue.findById({ _id: queueId });

  if (!queue || !queue.isActive) {
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
  const allTickets = await Ticket.find({ queueId });
  await ticket.save();
  res.status(201).json(allTickets);
};

export const leaveQueue = async (req, res) => {
  let queueId = req.params.queueId;
  let userId = req.userId;
  if (!userId) throw new CustomError(404, "UserId not found");
  console.log("queueId", queueId);
  const allTickets = await Ticket.find({ queueId });
  const deleteInfo = await Ticket.findOneAndDelete(userId);
  console.log("allticket:", allTickets);
  res.status(201).json(allTickets);
};
