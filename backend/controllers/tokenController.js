import Counter from '../models/Counter.model.js';
import Queue from '../models/Queue.model.js';
import Token from '../models/Token.model.js';
import { estimateEta } from '../services/eta.service.js';
import { emitQueueEvent } from '../services/socket.service.js';
import { log } from '../utils/logger.js';

const getNextTokenNumber = async (queueId) => {
  const counter = await Counter.findOneAndUpdate(
    { queue: queueId },
    { $inc: { current: 1 } },
    { new: true, upsert: true }
  );
  return counter.current;
};

export const joinQueue = async (req, res, next) => {
  try {
    const { queueId } = req.params;
    const queue = await Queue.findById(queueId);
    if (!queue) return res.status(404).json({ message: 'Queue not found' });
    const nextNumber = await getNextTokenNumber(queueId);
    const waiters = await Token.countDocuments({ queue: queueId, status: 'waiting' });
    const eta = estimateEta({ positionInQueue: waiters + 1, averageWaitMinutes: queue.averageWaitMinutes });
    const token = await Token.create({
      user: req.user?._id,
      queue: queueId,
      organization: queue.organization,
      number: nextNumber,
      etaMinutes: eta,
    });

    let statusEvent = 'token:joinedQueue';

    const activeServing = await Token.findOne({ queue: queueId, status: 'serving' });
    if (!activeServing) {
      token.status = 'serving';
      await token.save();
      queue.nowServing = token.number;
      await queue.save();
      statusEvent = 'token:nowServing';
      log('TOKEN', `Auto-shifting: Now serving token #${token.number} for queue ${queueId}.`);
    } else {
      await token.save();
      log('TOKEN', `User ${req.user?._id} joined queue ${queueId} - Token: #${token.number}`);
    }

    emitQueueEvent(queueId, statusEvent, token);
    res.status(201).json(token);
  } catch (error) {
    next(error);
  }
};

export const listQueueTokens = async (req, res, next) => {
  try {
    const tokens = await Token.find({ queue: req.params.queueId }).sort('number');
    res.json(tokens);
  } catch (error) {
    next(error);
  }
};

export const markTokenDone = async (req, res, next) => {
  try {
    const token = await Token.findById(req.params.id);
    if (!token) return res.status(404).json({ message: 'Token not found' });
    token.status = 'done';
    await token.save();

    log('TOKEN', `Staff ${req.user?._id} marked token #${token.number} as 'done'.`);

    const nextToken = await Token.findOne({ queue: token.queue, status: 'waiting' }).sort('number');
    if (nextToken) {
      nextToken.status = 'serving';
      await nextToken.save();
      await Queue.findByIdAndUpdate(token.queue, { nowServing: nextToken.number });
      log('TOKEN', `Auto-shifting: Now serving token #${nextToken.number} for queue ${token.queue}.`);
      emitQueueEvent(token.queue, 'token:nowServing', nextToken);
    }

    emitQueueEvent(token.queue, 'token:completed', token);
    res.json(token);
  } catch (error) {
    next(error);
  }
};
