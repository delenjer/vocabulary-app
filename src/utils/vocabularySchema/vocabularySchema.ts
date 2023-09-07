import mongoose, { Schema } from "mongoose";

const vocabularySchema = new Schema(
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
  },
  { timestamps: true }
);

const Vocabulary = mongoose.models.Vocabulary || mongoose.model("Vocabulary", vocabularySchema);
export default Vocabulary;
