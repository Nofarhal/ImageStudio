const express = require("express");
const multer = require("multer");
const cloudinary = require("../config/cloudinary");
const Image = require("../models/Image");
const authMiddleware = require("../middleware/authMiddleware");
const Replicate = require("replicate");

const router = express.Router();

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { originalImageUrl } = req.body;

    if (!originalImageUrl) {
      return res.status(400).json({ message: "Image URL is required" });
    }

    const image = await Image.create({
      userId: req.userId,
      originalImageUrl,
    });

    res.status(201).json({
      message: "Image saved successfully",
      image,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.post(
  "/upload",
  authMiddleware,
  upload.single("image"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No image file uploaded" });
      }

      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "ai-image-studio/originals",
            resource_type: "image",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );

        stream.end(req.file.buffer);
      });

      const image = await Image.create({
        userId: req.userId,
        originalImageUrl: uploadResult.secure_url,
        status: "uploaded",
      });

      res.status(201).json({
        message: "Image uploaded successfully",
        image,
      });
    } catch (error) {
      res.status(500).json({
        message: "Upload failed",
        error: error.message,
      });
    }
  }
);

router.get("/my-images", authMiddleware, async (req, res) => {
  try {
    const images = await Image.find({ userId: req.userId }).sort({
      createdAt: -1,
    });

    res.json(images);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.post("/:id/transform", authMiddleware, async (req, res) => {
  try {
    const { style, prompt } = req.body;

    const image = await Image.findOne({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    image.style = style;
    image.prompt = prompt;
    image.status = "processing";
    await image.save();

    const output = await replicate.run("black-forest-labs/flux-kontext-pro", {
      input: {
        prompt,
        input_image: image.originalImageUrl,
        aspect_ratio: "match_input_image",
        output_format: "png",
      },
    });

    const generatedUrl =
      typeof output === "string"
        ? output
        : Array.isArray(output)
        ? output[0]
        : output?.url
        ? output.url()
        : "";

    if (!generatedUrl) {
      image.status = "failed";
      await image.save();

      return res.status(500).json({
        message: "AI model did not return an image",
      });
    }

    image.generatedImageUrl = generatedUrl;
    image.status = "completed";
    await image.save();

    res.json({
      message: "Image transformed successfully",
      image,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Transform failed",
      error: error.message,
    });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const image = await Image.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    res.json({ message: "Image deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Delete failed",
      error: error.message,
    });
  }
});

module.exports = router;