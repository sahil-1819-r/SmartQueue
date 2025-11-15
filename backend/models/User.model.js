import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const feedbackHistorySchema = new mongoose.Schema(
  {
    feedback: { type: mongoose.Schema.Types.ObjectId, ref: 'Feedback' },
    queue: { type: mongoose.Schema.Types.ObjectId, ref: 'Queue' },
    rating: Number,
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ['user', 'orgOwner', 'staff', 'admin'],
      default: 'user',
    },
    organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization' },
    stats: {
      timeSavedMinutes: { type: Number, default: 0 },
      queuesJoined: { type: Number, default: 0 },
    },
    feedbackHistory: [feedbackHistorySchema],
  },
  { timestamps: true }
);

userSchema.pre('save', async function hashPassword(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = function comparePassword(candidate) {
  return bcrypt.compare(candidate, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;
