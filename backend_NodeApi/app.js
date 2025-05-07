const express = require('express');
const cors = require("cors");
const path = require("path");

const assetRoutes = require('./routes/assetRoutes');
const imageRoutes = require('./routes/imageRoutes');

const app = express();

// ✅ Use only one CORS configuration
app.use(
  cors({
    origin: "http://localhost:3001", // Your frontend
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.json());

// API routes
app.use('/api/assets', assetRoutes);

app.use('/api/image', imageRoutes);

// Also serve the output images as static files
app.use('/output', express.static(path.join(__dirname, 'output')));



module.exports = app;
