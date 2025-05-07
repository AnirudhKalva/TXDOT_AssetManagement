import React, { useState } from "react";
import "../css/AssetRating.css";

const assetConfigs = {
  roadway: {
    endpoint: "http://localhost:3000/api/assets/rate/roadway",
    fields: [
      { name: "installedDate", type: "date", label: "Installation Date" },
      { name: "lastMaintained", type: "date", label: "Last Maintained Date" },
    ],
  },
  highwaybuilding: {
    endpoint: "http://localhost:3000/api/assets/rate/highwaybuilding",
    fields: [
      { name: "installedDate", type: "date", label: "Installation Date" },
      { name: "fciIndex", type: "number", label: "FCI Index" },
    ],
  },
};

const imageAssetTypes = [
  { label: "Traffic Signal", value: "light" },
  { label: "Traffic Sign", value: "sign" },
  { label: "Roadway Illumination", value: "illumination" },
  { label: "Pavement Markings", value: "marking" },
  { label: "Highway Building", value: "building" },
];

function AssetRating() {
  const [selectedAsset, setSelectedAsset] = useState("roadway");
  const [imageAssetType, setImageAssetType] = useState("light");
  const [formData, setFormData] = useState({});
  const [rating, setRating] = useState("");
  const [image, setImage] = useState(null);
  const [processedImageURL, setProcessedImageURL] = useState("");
  const [detectedLabels, setDetectedLabels] = useState([]);
  const [activeForm, setActiveForm] = useState("historical");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const validatedValue = e.target.type === "number" ? Math.max(0, value) : value;
    setFormData((prev) => ({ ...prev, [name]: validatedValue }));
  };

  const handleAssetChange = (e) => {
    setSelectedAsset(e.target.value);
    setFormData({});
    setRating("");
  };

  const handleImageAssetChange = (e) => {
    setImageAssetType(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = assetConfigs[selectedAsset];
    try {
      const response = await fetch(config.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setRating(data.rating);
    } catch (error) {
      console.error("Error:", error);
      setRating("Error fetching rating");
    }
  };

  const handleImageUpload = (e) => {
    setImage(e.target.files[0]);
  };

  const handleImageSubmit = async (e) => {
    e.preventDefault();
    if (!image) return;

    const formData = new FormData();
    formData.append("image", image);
    formData.append("category", imageAssetType);

    try {
      const response = await fetch("http://localhost:3000/api/image/analyze", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      const imagePath = data.outputImage || data.image_url || "";
      setProcessedImageURL(imagePath ? "http://localhost:3000" + imagePath : "");

      setDetectedLabels(data.detections || []);
    } catch (error) {
      console.error("Image processing error:", error);
    }
  };

  const config = assetConfigs[selectedAsset];

  return (
    <div className="page-container">
      <header className="banner-header">
        <h1>Asset Detection and Rating</h1>
        <p>Assess the condition of infrastructure assets using forms and images.</p>
      </header>

      <div className="content-wrapper-horizontal">
        {/* Left Panel - Image Detection */}
        <div className="left-panel">
          <h2>Image-based Asset Detection</h2>
          <label><b>Select Asset Type:</b></label>
          <select
            value={imageAssetType}
            onChange={handleImageAssetChange}
            style={{ width: "100%", marginBottom: "1rem" }}
          >
            {imageAssetTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>

          <form onSubmit={handleImageSubmit}>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
              <button type="submit" className="btn-submit">Upload</button>
            </div>
          </form>

          {processedImageURL && (
            <div style={{ marginTop: "1rem", textAlign: "center" }}>
              <p><b>Processed Image:</b></p>
              <img src={processedImageURL} alt="Processed" style={{ maxWidth: "100%", borderRadius: "8px" }} />

              {detectedLabels.length > 0 && (
                <div style={{ marginTop: "1rem", textAlign: "left" }}>
                  <h4>Detected Signs:</h4>
                  <ul>
                    {detectedLabels.map((item, index) => (
                      <li key={index}>
                        {item.label} ({(item.confidence * 100).toFixed(1)}%)
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Panel - Historical / Image Condition */}
        <div className="right-panel">
          <div className="segmented-switch">
            <button
              className={activeForm === "historical" ? "seg-btn active" : "seg-btn"}
              onClick={() => setActiveForm("historical")}
            >
              Historical Data
            </button>
            <button
              className={activeForm === "imagecondition" ? "seg-btn active" : "seg-btn"}
              onClick={() => setActiveForm("imagecondition")}
            >
              Image Condition
            </button>
            <div className={`seg-highlight ${activeForm}`}></div>
          </div>

          <div className="animated-form">
            {activeForm === "historical" ? (
              <div className="card-container fade-in">
                <h2>Historical Data Based Rating</h2>
                <form onSubmit={handleSubmit}>
                  <label><b>Select Asset Type:</b></label>
                  <select value={selectedAsset} onChange={handleAssetChange}>
                    {Object.keys(assetConfigs).map((key) => (
                      <option value={key} key={key}>
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </option>
                    ))}
                  </select>
                  {config.fields.map((field) => (
                    <div key={field.name} style={{ marginBottom: "1rem" }}>
                      <label><b>{field.label}:</b></label><br />
                      <input
                        type={field.type}
                        name={field.name}
                        value={formData[field.name] || ""}
                        onChange={handleInputChange}
                        required
                        min={field.type === "number" ? 0 : undefined}
                      />
                    </div>
                  ))}
                  <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
                    <button type="submit" className="btn-submit">Get Rating</button>
                  </div>
                </form>
                {rating && (
                  <div style={{ marginTop: "1rem", fontWeight: "bold", color: "green", textAlign: "center" }}>
                    Rating: {rating}
                  </div>
                )}
              </div>
            ) : (
              <div className="card-container fade-in">
                <h2>Image-based Condition Rating</h2>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AssetRating;
