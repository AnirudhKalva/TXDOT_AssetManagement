const axios = require("axios");
const path = require("path");
const fs = require("fs");
const FormData = require("form-data");

const assetConfig = {
  light: { expects: "image" },
  sign: { expects: "json" },
  // Add more asset types here
};

exports.analyzeImage = async (req, res) => {
  try {
    const { category } = req.body;
    const file = req.file;

    if (!file || !category) {
      return res.status(400).json({ error: "Image and category are required" });
    }

    const config = assetConfig[category];
    if (!config) {
      return res.status(400).json({ error: `Unsupported asset type: ${category}` });
    }

    const imagePath = path.join(__dirname, "..", "test", file.filename);
    const apiURL = `http://127.0.0.1:8000/analyze/${category}`;

    const form = new FormData();
    form.append("file", fs.createReadStream(imagePath));

    const response = await axios.post(apiURL, form, {
      headers: form.getHeaders(),
      responseType: config.expects === "image" ? "arraybuffer" : "json",
    });

    const outputDir = path.join(__dirname, "..", "output");
    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

    if (config.expects === "image") {
      // FastAPI returns raw image bytes
      const outputPath = path.join(outputDir, file.filename);
      fs.writeFileSync(outputPath, Buffer.from(response.data), "binary");

      return res.json({
        message: `Image processed via ${category}`,
        outputImage: `/output/${file.filename}`,
      });
    } else {
      // FastAPI returns JSON with `image_url` pointing to FastAPI's folder
      const { detections, image_url } = response.data;
      const filename = path.basename(image_url);

      // Copy image from FastAPI output dir to Node output dir
      const fastapiOutputPath = path.join(__dirname, "..", "..", "model_api", image_url); // assuming FastAPI lives in ../model_api
      const nodeOutputPath = path.join(outputDir, filename);

      if (fs.existsSync(fastapiOutputPath)) {
        fs.copyFileSync(fastapiOutputPath, nodeOutputPath);
      } else {
        console.warn("⚠️ Could not find image at FastAPI path:", fastapiOutputPath);
      }

      return res.json({
        detections,
        image_url: `/output/${filename}`,
      });
    }
  } catch (err) {
    console.error("FastAPI error:", err.message);
    return res.status(500).json({ error: "Image analysis failed" });
  }
};
