from fastapi import APIRouter, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
import tensorflow as tf
import numpy as np
from PIL import Image
import io
import json
import os

router = APIRouter()

# Load model and label map once at startup
MODEL_PATH = os.path.join(os.path.dirname(__file__), "..", "..", "..", "artifacts_plants", "corn_efficientnetb0_final.keras")
LABEL_MAP_PATH = os.path.join(os.path.dirname(__file__), "..", "..", "..", "artifacts_plants", "label_map.json")

try:
    model = tf.keras.models.load_model(MODEL_PATH)
except Exception as e:
    model = None
    print(f"Error loading model: {e}")

try:
    with open(LABEL_MAP_PATH, "r") as f:
        label_map = json.load(f)
except Exception as e:
    label_map = {}
    print(f"Error loading label map: {e}")

IMG_SIZE = (224, 224)

def preprocess_image(image_bytes):
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    image = image.resize(IMG_SIZE)
    image_array = np.array(image) / 255.0
    image_array = np.expand_dims(image_array, axis=0)  # batch dimension
    return image_array

@router.post("/upload/")
async def upload_image(file: UploadFile = File(...)):
    if model is None:
        raise HTTPException(status_code=500, detail="Model not loaded")

    contents = await file.read()
    try:
        input_array = preprocess_image(contents)
        preds = model.predict(input_array)
        pred_idx = int(np.argmax(preds[0]))
        pred_label = label_map.get(str(pred_idx), "Unknown")
        confidence = float(np.max(preds[0]))
        return JSONResponse(content={
            "filename": file.filename,
            "prediction": pred_label,
            "confidence": confidence
        })
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error processing image: {e}")