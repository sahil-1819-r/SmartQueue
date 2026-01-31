import mongoose, { mongo, Schema } from "mongoose";

const orgSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Organisation", orgSchema);
