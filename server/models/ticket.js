import mongoose, { Schema } from "mongoose";

const ticketSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    serviceId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    position: {
      type: Number,
      default: -1,
    },
    expired: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Ticket", ticketSchema);
