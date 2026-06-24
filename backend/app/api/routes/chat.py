from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional
from datetime import datetime
import google.generativeai as genai
from app.core.config import get_settings
import uuid

router = APIRouter(prefix="/api/chat", tags=["AI Chat"])
settings = get_settings()

try:
    genai.configure(api_key=settings.gemini_api_key)
except Exception:
    pass

class ChatRequest(BaseModel):
    message: str
    session_id: Optional[str] = None
    language: Optional[str] = "en"

@router.post("")
async def send_message(request: ChatRequest):
    if not settings.gemini_api_key:
        raise HTTPException(status_code=500, detail="Gemini API Key not configured")
        
    model = genai.GenerativeModel("gemini-2.5-flash")
    
    prompt = f"User message: {request.message}\nLanguage: {request.language}\nPlease respond helpfully as an AI banking assistant for SBI Saathi. Keep responses concise."
    
    try:
        response = model.generate_content(prompt)
        ai_response = response.text
    except Exception as e:
        print(f"Chat error: {e}")
        raise HTTPException(status_code=500, detail=str(e))
        
    session_id = request.session_id if request.session_id else str(uuid.uuid4())
    
    return {
        "response": ai_response,
        "session_id": session_id,
        "timestamp": datetime.utcnow().isoformat(),
    }
