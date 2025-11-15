import Queue from '../models/Queue.model.js';
import Organization from '../models/Organization.model.js';
import { log } from '../utils/logger.js';

export const createQueue = async (req, res, next) => {
  try {
    const queue = await Queue.create({
      ...req.body,
      organization: req.user.organization,
    });
    await Organization.findByIdAndUpdate(req.user.organization, {
      $push: { queues: { queue: queue._id, name: queue.name } },
    });
    log('QUEUE', `Org ${req.user.organization} created new queue: ${queue.name}`);
    res.status(201).json(queue);
  } catch (error) {
    next(error);
  }
};

export const getQueue = async (req, res, next) => {
  try {
    const queue = await Queue.findById(req.params.id).populate('organization');
    res.json(queue);
  } catch (error) {
    next(error);
  }
};

export const listQueues = async (_req, res, next) => {
  try {
    const queues = await Queue.find().populate('organization');
    res.json(queues);
  } catch (error) {
    next(error);
  }
};

export const updateQueue = async (req, res, next) => {
  try {
    const queue = await Queue.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(queue);
  } catch (error) {
    next(error);
  }
};
