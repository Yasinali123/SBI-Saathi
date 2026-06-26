from fastapi import APIRouter, UploadFile, File, HTTPException
from datetime import datetime
from app.core.config import get_settings
import google.generativeai as genai
import re
import uuid
import json

# For document text extraction
import io
from PIL import Image
import pytesseract
import fitz  # PyMuPDF

router = APIRouter(prefix="/api/document-explain", tags=["Document Analysis"])
settings = get_settings()
genai.configure(api_key=settings.gemini_api_key)

ALLOWED_TYPES = {
    "application/pdf",
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
}
MAX_SIZE_MB = 10


def _extract_text_from_file(file_bytes: bytes, content_type: str) -> str:
    """Extract plain text from PDF or common image types using PyMuPDF and pytesseract."""
    try:
        if content_type == "application/pdf":
            doc = fitz.open(stream=file_bytes, filetype="pdf")
            text_parts = []
            for page in doc:
                text_parts.append(page.get_text())
            return "\n\n".join(text_parts)
        else:
            # assume image
            img = Image.open(io.BytesIO(file_bytes))
            text = pytesseract.image_to_string(img)
            return text
    except Exception as e:
        # return minimal fallback
        return f"""(unable to extract text from file: {e})"""


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

    # Extract text first
    extracted_text = _extract_text_from_file(file_bytes, file.content_type)

    model = getattr(settings, "gemini_model", "gemini-1.0")

    prompt = f"""
    Below is the extracted text from an uploaded document. Analyze this document and provide a JSON summary.

    Extracted text:
    {extracted_text[:8000]}

    Respond strictly with valid JSON with the following structure:
    {{
        "summary": "<string summary>",
        "document_type": "<string type e.g. bank statement, invoice>",
        "key_points": ["<point 1>", "<point 2>"],
        "risk_clauses": ["<clause 1>", "<clause 2>"],
        "important_dates": ["<date 1>", "<date 2>"],
        "financial_obligations": ["<obligation 1>", "<obligation 2>"]
    }}
    """

    try:
        model = genai.GenerativeModel("gemini-2.5-flash")
        response = model.generate_content(prompt)
        resp_text = response.text

        match = re.search(r"\{.*\}", resp_text, re.DOTALL)
        if match:
            analysis = json.loads(match.group())
        else:
            analysis = json.loads(resp_text)
    except Exception as e:
        analysis = {
            "summary": "Could not analyze document properly. " + str(e),
            "document_type": "Unknown",
            "key_points": [],
            "risk_clauses": [],
            "important_dates": [],
            "financial_obligations": [],
        }

    return {
        "document_id": str(uuid.uuid4()),
        "filename": file.filename,
        "summary": analysis.get("summary", ""),
        "key_points": analysis.get("key_points", []),
        "risk_clauses": analysis.get("risk_clauses", []),
        "document_type": analysis.get("document_type", "Unknown"),
        "extracted_text_preview": extracted_text[:200],
        "important_dates": analysis.get("important_dates", []),
        "financial_obligations": analysis.get("financial_obligations", []),
    }
