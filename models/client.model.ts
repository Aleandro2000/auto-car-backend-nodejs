import mongoose from "mongoose";
import { emailRegexValidator, phoneNumberRegexValidator } from "../utils/regex";

const clientSchema = new mongoose.Schema(
  {
    clientId: {
      type: Number,
      default: 0,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
      match: emailRegexValidator,
    },
    phone_number: {
      type: String,
      required: true,
      unique: true,
      match: phoneNumberRegexValidator,
    },
    cars_details: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const clientModel = mongoose.model("client", clientSchema);

clientSchema.pre("save", async function (next) {
  if (this.isNew) {
    let total = await clientModel.find().sort({ id: -1 }).limit(1);
    this.clientId = total.length === 0 ? 1 : Number(total[0].id) + 1;
    next();
  }
});

export default clientModel;
