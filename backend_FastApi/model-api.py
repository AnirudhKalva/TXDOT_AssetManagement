from fastapi import FastAPI, UploadFile, File
from fastapi.responses import Response, FileResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os
import shutil
import cv2
import base64

from detectors.trafficLightdetection import detect_traffic_light
from detectors.trafficsign_detection import detect_traffic_sign

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.mount("/output", StaticFiles(directory="output"), name="output")

def save_temp_file(file):
    os.makedirs("temp", exist_ok=True)
    path = os.path.join("temp", file.filename)
    with open(path, "wb") as f:
        shutil.copyfileobj(file.file, f)
    return path

@app.post("/analyze/light")
async def analyze_light(file: UploadFile = File(...)):
    path = save_temp_file(file)  # Save the uploaded file to disk

    output_path, _ = detect_traffic_light(path)  # Pass the file path

    return FileResponse(output_path, media_type="image/jpeg")


@app.post("/analyze/sign")
async def analyze_sign(file: UploadFile = File(...)):
    try:
        path = save_temp_file(file)

        detections, output_filename = detect_traffic_sign(path)

        return JSONResponse(content={
            "detections": detections,
            "image_url": f"/output/{output_filename}"
        })

    except Exception as e:
        import traceback
        traceback.print_exc()
        return JSONResponse(status_code=500, content={"error": str(e)})


