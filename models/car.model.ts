import mongoose from "mongoose";

const carSchema = new mongoose.Schema(
  {
    carId: {
      type: Number,
      default: 0,
    },
    registration_number: {
      type: String,
      required: true,
    },
    chassis_series: {
      type: String,
      required: true,
    },
    client_id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "client",
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const carModel = mongoose.model("car", carSchema);

carSchema.pre("save", async function (next) {
  if (this.isNew) {
    let total = await carModel.find().sort({ carId: -1 }).limit(1);
    this.carId = total.length === 0 ? 1 : Number(total[0].carId) + 1;
    next();
  }
});

export default carModel;
