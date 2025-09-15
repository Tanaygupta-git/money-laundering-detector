from fastapi import FastAPI, File, UploadFile, Form, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from starlette.requests import Request
import uvicorn, os, shutil, tempfile, csv
from pydantic import BaseModel, EmailStr
from typing import List
from utils.ocr_utils import extract_text_from_pdf, extract_text_from_image
from models.mock_model import predict_money_laundering
from utils.file_utils import allowed_file, secure_filename
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig
import logging
from datetime import datetime

# Email configuration (for contact endpoint)
conf = ConnectionConfig(
    MAIL_USERNAME = os.getenv("MAIL_USERNAME", "your_email@gmail.com"),
    MAIL_PASSWORD = os.getenv("MAIL_PASSWORD", "your_email_password"),
    MAIL_FROM = os.getenv("MAIL_FROM", "your_email@gmail.com"),
    MAIL_PORT = 587,
    MAIL_SERVER = "smtp.gmail.com",
    MAIL_FROM_NAME="MoneyLaundering Detector Admin",
    MAIL_TLS = True,
    MAIL_SSL = False,
    USE_CREDENTIALS = True
)

app = FastAPI(
    title="Money Laundering Detection API",
    description="Detect suspicious activity through AI/ML",
    version="1.0"
)

# CORS setup for frontend-backend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Set your frontend URL in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Logging
if not os.path.exists("logs"):
    os.makedirs("logs")
logging.basicConfig(filename="logs/app.log", level=logging.INFO)

# Admin authentication
security = HTTPBasic()
ADMIN_USER = os.getenv("ADMIN_USER", "admin")
ADMIN_PASS = os.getenv("ADMIN_PASS", "adminpass")

def verify_admin(credentials: HTTPBasicCredentials = Depends(security)):
    if credentials.username == ADMIN_USER and credentials.password == ADMIN_PASS:
        return True
    raise HTTPException(status_code=401, detail="Unauthorized")

class ContactForm(BaseModel):
    name: str
    email: EmailStr
    message: str

@app.post("/api/upload")
async def upload_file(file: UploadFile = File(...)):
    ext = os.path.splitext(file.filename)[1].lower()
    if not allowed_file(ext):
        raise HTTPException(status_code=400, detail="Invalid file type.")

    if file.spool_max_size > 10 * 1024 * 1024:
        raise HTTPException(status_code=413, detail="File too large (max 10MB).")
    
    with tempfile.NamedTemporaryFile(delete=False, suffix=ext) as tmp:
        shutil.copyfileobj(file.file, tmp)
        tmp_path = tmp.name

    try:
        # OCR & content extraction
        text_content = ""
        if ext in [".pdf"]:
            text_content = extract_text_from_pdf(tmp_path)
        elif ext in [".jpg", ".jpeg", ".png"]:
            text_content = extract_text_from_image(tmp_path)
        elif ext in [".csv", ".xlsx"]:
            with open(tmp_path, "r", encoding="utf-8", errors="ignore") as f:
                text_content = f.read()
        else:
            text_content = ""
        
        if not text_content.strip():
            raise HTTPException(status_code=422, detail="Could not extract meaningful content from file.")

        # ML Model Prediction (mock or real)
        pred, score = predict_money_laundering(text_content)
        # Log the analysis
        logging.info(f"{datetime.now()} - File: {file.filename} - Prediction: {pred} ({score*100:.1f}%)")

        return {"prediction": pred, "confidence": round(score*100, 2)}
    finally:
        os.remove(tmp_path)

@app.post("/api/contact")
async def contact(form: ContactForm):
    # Simple CAPTCHA or rate limiting can be added here
    # Send email to admin
    message = MessageSchema(
        subject="Money Laundering Detector Contact Form",
        recipients=[conf.MAIL_FROM],  # Admin's email
        body=f"From: {form.name} ({form.email})\n\nMessage:\n{form.message}",
        subtype="plain"
    )
    fm = FastMail(conf)
    try:
        await fm.send_message(message)
        return {"success": True, "msg": "Your message has been sent."}
    except Exception as e:
        logging.error(f"Email error: {e}")
        raise HTTPException(status_code=500, detail="Could not send email.")

@app.get("/api/logs", dependencies=[Depends(verify_admin)])
def get_logs():
    with open("logs/app.log", "r") as f:
        return {"logs": f.read()}

@app.get("/api/analyses", dependencies=[Depends(verify_admin)])
def get_analyses():
    # In real system, query from DB. Here, parse logs for demo.
    results = []
    with open("logs/app.log", "r") as f:
        for line in f:
            if "Prediction:" in line:
                try:
                    ts, rest = line.strip().split(" - File: ", 1)
                    fname, pred = rest.split(" - Prediction: ")
                    results.append({"timestamp": ts, "file": fname, "result": pred})
                except Exception:
                    continue
    return {"analyses": results}