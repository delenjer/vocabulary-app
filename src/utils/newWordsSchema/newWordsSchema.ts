import mongoose, { Schema } from "mongoose";

const newWordsSchema = new Schema(
  {
    word: {
      type: String,
      required: true,
    },
    translate: {
      type: String,
      required: true,
    },
    transcription: {
      type: String,
    },
    lable: {
      type: String,
    }
  },
  { timestamps: true }
);

const NewWords = mongoose.models.NewWords || mongoose.model("NewWords", newWordsSchema);
export default NewWords;