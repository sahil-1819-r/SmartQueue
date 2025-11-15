import mongoose from 'mongoose';

const counterSchema = new mongoose.Schema(
  {
    queue: { type: mongoose.Schema.Types.ObjectId, ref: 'Queue', unique: true },
    current: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Counter = mongoose.model('Counter', counterSchema);
export default Counter;
