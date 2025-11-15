import Feedback from '../models/Feedback.model.js';
import User from '../models/User.model.js';
import { log } from '../utils/logger.js';

export const createFeedback = async (req, res, next) => {
  try {
    const feedback = await Feedback.create({
      ...req.body,
      user: req.user._id,
    });
    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        feedbackHistory: {
          feedback: feedback._id,
          queue: feedback.queue,
          rating: feedback.rating,
        },
      },
    });
    log('FEEDBACK', `Received ${feedback.rating}-star rating for token ${feedback.token}`);
    res.status(201).json(feedback);
  } catch (error) {
    next(error);
  }
};

export const listFeedback = async (req, res, next) => {
  try {
    const feedback = await Feedback.find({ queue: req.params.queueId });
    res.json(feedback);
  } catch (error) {
    next(error);
  }
};
