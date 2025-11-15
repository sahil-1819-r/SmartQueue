import mongoose from 'mongoose';

const tokenSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    queue: { type: mongoose.Schema.Types.ObjectId, ref: 'Queue', required: true },
    organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true },
    number: { type: Number, required: true },
    status: {
      type: String,
      enum: ['waiting', 'serving', 'done', 'cancelled'],
      default: 'waiting',
    },
    etaMinutes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Token = mongoose.model('Token', tokenSchema);
export default Token;
