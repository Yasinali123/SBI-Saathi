from fastapi import APIRouter, UploadFile, File, HTTPException
from datetime import datetime
import google.generativeai as genai
from app.core.config import get_settings
import uuid
import json

router = APIRouter(prefix="/api/document-explain", tags=["Document Analysis"])
settings = get_settings()

ALLOWED_TYPES = {
    "application/pdf",
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
}
MAX_SIZE_MB = 10

@router.post("")
async def upload_document(file: UploadFile = File(...)):
    if not settings.gemini_api_key:
        raise HTTPException(status_code=500, detail="Gemini API Key not configured")

    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported file type: {file.content_type}. Use PDF, JPG, or PNG.",
        )

    file_bytes = await file.read()

    if len(file_bytes) > MAX_SIZE_MB * 1024 * 1024:
        raise HTTPException(
            status_code=400,
            detail=f"File too large. Maximum size is {MAX_SIZE_MB}MB.",
        )

    model = genai.GenerativeModel("gemini-2.5-flash")
    
    prompt = """
    Analyze this document and provide a summary.
    
    Respond strictly with valid JSON with the following structure:
    {
        "summary": "<string summary>",
        "document_type": "<string type e.g. bank statement, invoice>",
        "key_points": ["<point 1>", "<point 2>"],
        "risk_clauses": ["<clause 1>", "<clause 2>"],
        "important_dates": ["<date 1>", "<date 2>"],
        "financial_obligations": ["<obligation 1>", "<obligation 2>"]
    }
    """
    
    document_part = {
        "mime_type": file.content_type,
        "data": file_bytes
    }
    
    try:
        response = model.generate_content([prompt, document_part])
        text = response.text.strip()
        if text.startswith("```json"):
            text = text[7:]
        if text.endswith("```"):
            text = text[:-3]
        
        analysis = json.loads(text.strip())
    except Exception as e:
        analysis = {
            "summary": "Could not analyze document properly. " + str(e),
            "document_type": "Unknown",
            "key_points": [],
            "risk_clauses": [],
            "important_dates": [],
            "financial_obligations": []
        }

    return {
        "document_id": str(uuid.uuid4()),
        "filename": file.filename,
        "summary": analysis.get("summary", ""),
        "key_points": analysis.get("key_points", []),
        "risk_clauses": analysis.get("risk_clauses", []),
        "document_type": analysis.get("document_type", "Unknown"),
        "extracted_text_preview": "Extracted by Gemini AI",
        "important_dates": analysis.get("important_dates", []),
        "financial_obligations": analysis.get("financial_obligations", []),
    }
