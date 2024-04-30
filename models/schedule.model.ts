import mongoose from "mongoose";
import validators from "../utils/validators";

const scheduleSchema = new mongoose.Schema(
  {
    scheduleId: {
      type: Number,
      default: 0,
    },
    date: {
      type: Date,
      required: true,
      validator: {
        validate: validators.verifyDate,
      },
    },
    duration: {
      type: Number,
      required: true,
      validator: {
        validate: validators.verifyDuration,
      },
    },
    car_id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "car",
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const scheduleModel = mongoose.model("schedule", scheduleSchema);

scheduleSchema.pre("save", async function (next) {
  if (this.isNew) {
    let total = await scheduleModel.find().sort({ scheduleId: -1 }).limit(1);
    this.scheduleId = total.length === 0 ? 1 : Number(total[0].scheduleId) + 1;
    next();
  }
});

export default scheduleModel;
