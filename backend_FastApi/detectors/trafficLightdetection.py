import cv2
import numpy as np
import os
import urllib.request

# ========== Download model if needed ==========
def download_file(url, output_path):
    if not os.path.exists(output_path):
        print(f"⬇️ Downloading {output_path}...")
        urllib.request.urlretrieve(url, output_path)
        print(f"✅ Downloaded {output_path}")

weights_url = "https://pjreddie.com/media/files/yolov3.weights"
config_url = "https://github.com/pjreddie/darknet/blob/master/cfg/yolov3.cfg?raw=true"
labels_url = "https://raw.githubusercontent.com/pjreddie/darknet/master/data/coco.names"

download_file(weights_url, "yolov3.weights")
download_file(config_url, "yolov3.cfg")
download_file(labels_url, "coco.names")

# ========== Load model ==========
with open("coco.names", "r") as f:
    classes = [line.strip() for line in f.readlines()]

net = cv2.dnn.readNet("yolov3.weights", "yolov3.cfg")


# ========== Detection Function ==========
def detect_traffic_light(image_path, output_dir="output"):
    os.makedirs(output_dir, exist_ok=True)

    image = cv2.imread(image_path)
    if image is None:
        raise ValueError(f"❌ Could not read image: {image_path}")

    height, width = image.shape[:2]

    blob = cv2.dnn.blobFromImage(image, 1/255.0, (416, 416), swapRB=True, crop=False)
    net.setInput(blob)

    layer_names = net.getLayerNames()
    output_layers = [layer_names[i - 1] for i in net.getUnconnectedOutLayers().flatten()]
    detections = net.forward(output_layers)

    boxes, confidences = [], []

    for output in detections:
        for detection in output:
            scores = detection[5:]
            class_id = np.argmax(scores)
            confidence = scores[class_id]

            if confidence > 0.5 and classes[class_id] == "traffic light":
                center_x = int(detection[0] * width)
                center_y = int(detection[1] * height)
                w = int(detection[2] * width)
                h = int(detection[3] * height)
                x = int(center_x - w / 2)
                y = int(center_y - h / 2)

                boxes.append([x, y, w, h])
                confidences.append(float(confidence))

    indexes = cv2.dnn.NMSBoxes(boxes, confidences, score_threshold=0.5, nms_threshold=0.3)

    for i in indexes.flatten():
        x, y, w, h = boxes[i]
        label = f"Traffic Light: {confidences[i]:.2f}"
        cv2.rectangle(image, (x, y), (x + w, y + h), (0, 255, 0), 2)
        cv2.putText(image, label, (x, y - 10),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

    # Save to output
    filename = os.path.basename(image_path)
    output_path = os.path.join(output_dir, filename)
    cv2.imwrite(output_path, image)

    print(f"✅ Processed: {filename} → {output_path}")
    return output_path, confidences
