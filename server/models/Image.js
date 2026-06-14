const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    originalImageUrl: {
      type: String,
      required: true,
    },
    generatedImageUrl: {
      type: String,
      default: "",
    },
    style: {
      type: String,
      default: "",
    },
    prompt: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["uploaded", "processing", "completed", "failed"],
      default: "uploaded",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Image", imageSchema);