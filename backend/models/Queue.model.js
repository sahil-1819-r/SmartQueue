import mongoose from 'mongoose';

const queueSchema = new mongoose.Schema(
  {
    organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true },
    name: { type: String, required: true },
    description: String,
    averageWaitMinutes: { type: Number, default: 5 },
    estimatedServiceTime: { type: Number, default: 5 },
    active: { type: Boolean, default: true },
    nowServing: { type: Number, default: 0 },
    staff: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    qrCodeUrl: String,
  },
  { timestamps: true }
);

const Queue = mongoose.model('Queue', queueSchema);
export default Queue;
