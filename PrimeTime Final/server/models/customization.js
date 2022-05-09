import mongoose from "mongoose";

const customizationSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  violonBody: {
    type: String,
    required: true,
  },
  violonStick: {
    type: String,
    required: true,
  },
  violonChincrest: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    ref: "User",
  },
});

export default mongoose.model("Customization", customizationSchema);
