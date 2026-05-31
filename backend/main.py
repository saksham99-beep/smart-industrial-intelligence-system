import asyncio
import random
import os

from contextlib import asynccontextmanager

from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from vector_store import build_vector_store, semantic_search, ingest_pdf
from database import engine, SessionLocal
from models import Base, SystemLog


# ----------------------
# Setup
# ----------------------
UPLOAD_DIR = "uploaded_docs"
os.makedirs(UPLOAD_DIR, exist_ok=True)


def save_log(level, message, timestamp):
    db = SessionLocal()
    log = SystemLog(
        level=level,
        message=message,
        timestamp=timestamp
    )
    db.add(log)
    db.commit()
    db.close()


# ----------------------
# Lifespan (STARTUP LOGIC)
# ----------------------
@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Starting backend...")

    Base.metadata.create_all(bind=engine)
    build_vector_store()

    print("Backend ready.")
    yield

    print("Shutting down...")


# ----------------------
# APP
# ----------------------
app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ----------------------
# MODELS
# ----------------------
class AIRequest(BaseModel):
    query: str


class PredictionRequest(BaseModel):
    temperature: int
    vibration: int
    pressure: int = 50


# ----------------------
# ROUTES
# ----------------------
@app.get("/machine-status")
def machine_status():
    return {
        "temperature": random.randint(70, 95),
        "vibration": random.randint(40, 75),
        "risk": random.randint(10, 95),
        "status": "Critical" if random.randint(0, 1) else "Stable"
    }


@app.post("/ask-ai")
def ask_ai(request: AIRequest):
    relevant_chunks = semantic_search(request.query)

    if relevant_chunks:
        response = " ".join(relevant_chunks)
    else:
        response = "No relevant industrial knowledge found."

    return {"response": response}


@app.post("/upload-document")
async def upload_document(file: UploadFile = File(...)):
    file_path = os.path.join(UPLOAD_DIR, file.filename)

    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())

    chunks_added = ingest_pdf(file_path)

    return {
        "message": "Document uploaded successfully",
        "chunks_added": chunks_added,
    }


@app.post("/predict-failure")
def predict_failure(request: PredictionRequest):
    risk_score = 0

    if request.temperature > 85:
        risk_score += 35

    if request.vibration > 60:
        risk_score += 40

    if request.pressure > 65:
        risk_score += 25

    if risk_score >= 70:
        status = "Critical"
        recommendation = "Immediate inspection required. Check bearing assembly, lubrication system, and cooling unit."
    elif risk_score >= 40:
        status = "Warning"
        recommendation = "Schedule preventive maintenance within 24-48 hours."
    else:
        status = "Stable"
        recommendation = "Machine operating within normal range."

    save_log(status, recommendation, "LIVE")

    return {
        "risk_score": risk_score,
        "status": status,
        "recommendation": recommendation
    }