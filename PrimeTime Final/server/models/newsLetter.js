import mongoose from "mongoose";

const newsLetterSchema = mongoose.Schema({
  email: { type: String, required:  true },
});

export default mongoose.model("newsLetter", newsLetterSchema);