import os
import cv2
import torch
import numpy as np
from PIL import Image
from ultralytics import YOLO

# Setup
BASE_DIR = os.path.dirname(os.path.dirname(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "best.pt")
OUTPUT_DIR = os.path.join(BASE_DIR, "output")
os.makedirs(OUTPUT_DIR, exist_ok=True)  # Ensure output directory exists

SUPPORTED_FORMATS = [".jpg", ".jpeg", ".png"]
model = YOLO(MODEL_PATH).to("cuda" if torch.cuda.is_available() else "cpu")


def detect_traffic_sign(image_path):
    ext = os.path.splitext(image_path)[1].lower()
    if ext not in SUPPORTED_FORMATS:
        raise ValueError(f"Unsupported image format: {ext}. Supported formats: {SUPPORTED_FORMATS}")

    # ✅ Load image using PIL for consistent results across formats
    try:
        pil_image = Image.open(image_path).convert("RGB")
    except Exception as e:
        raise ValueError(f"Failed to open image: {e}")

    # Convert to OpenCV format
    image = cv2.cvtColor(np.array(pil_image), cv2.COLOR_RGB2BGR)

    # ✅ Run detection using YOLOv8
    results = model(image)  # Accepts numpy array
    result = results[0]

    detections = []

    if result.boxes is not None:
        for box in result.boxes:
            x1, y1, x2, y2 = map(int, box.xyxy[0])
            conf = round(box.conf[0].item(), 2)
            cls = int(box.cls[0].item())
            label = model.names[cls]

            detections.append({
                "label": label,
                "confidence": conf,
            })

            # Draw on image
            cv2.rectangle(image, (x1, y1), (x2, y2), (255, 0, 0), 2)
            cv2.putText(image, f"{label} {conf}", (x1, y1 - 10),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 0, 0), 2)

    # Save result image to /output with original filename
    filename = os.path.basename(image_path)
    output_path = os.path.join(OUTPUT_DIR, filename)
    cv2.imwrite(output_path, image)

    return detections, filename
