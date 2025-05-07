const express = require("express");
const router = express.Router();
const multer = require("multer");
const imageController = require("../controllers/imageController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "test/"),
  filename: (req, file, cb) => cb(null, file.originalname),
});
const upload = multer({ storage });

router.post("/analyze", upload.single("image"), imageController.analyzeImage);

module.exports = router;
