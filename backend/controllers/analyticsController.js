import Token from '../models/Token.model.js';
import Feedback from '../models/Feedback.model.js';

export const queueAnalytics = async (req, res, next) => {
  try {
    const data = await Token.aggregate([
      { $match: { queue: req.params.queueId } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          avgEta: { $avg: '$etaMinutes' },
        },
      },
    ]);
    const feedback = await Feedback.aggregate([
      { $match: { queue: req.params.queueId } },
      {
        $group: {
          _id: null,
          avgRating: { $avg: '$rating' },
          totalFeedback: { $sum: 1 },
        },
      },
    ]);
    res.json({ data, feedback: feedback[0] || { avgRating: null, totalFeedback: 0 } });
  } catch (error) {
    next(error);
  }
};

export const userAnalytics = async (req, res, next) => {
  try {
    const tokens = await Token.find({ user: req.user._id });
    const timeSaved = tokens.reduce((acc, t) => acc + (t.etaMinutes || 0), 0);
    res.json({ totalQueues: tokens.length, timeSaved });
  } catch (error) {
    next(error);
  }
};
