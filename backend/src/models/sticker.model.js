import mongoose from "mongoose";

const stickerSchema = new mongoose.Schema({
  giphyId: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Sticker = mongoose.model("Sticker", stickerSchema);

export default Sticker;