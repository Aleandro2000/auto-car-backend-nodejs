import mongoose from "mongoose";

const historySchema = new mongoose.Schema(
  {
    historyId: {
      type: Number,
      default: 0,
    },
    car_details: {
      type: String,
      required: true,
    },
    car_processing: {
      type: String,
      required: true,
    },
    schedule_id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "schedule",
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const historyModel = mongoose.model("history", historySchema);

historySchema.pre("save", async function (next) {
  if (this.isNew) {
    let total = await historyModel.find().sort({ historyId: -1 }).limit(1);
    this.historyId = total.length === 0 ? 1 : Number(total[0].historyId) + 1;
    next();
  }
});

export default historyModel;
