import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema(
  {
    token: { type: mongoose.Schema.Types.ObjectId, ref: 'Token', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    queue: { type: mongoose.Schema.Types.ObjectId, ref: 'Queue', required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: String,
  },
  { timestamps: true }
);

const Feedback = mongoose.model('Feedback', feedbackSchema);
export default Feedback;
